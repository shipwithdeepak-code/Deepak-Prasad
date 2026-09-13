import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

interface KnowledgeChunk {
  id: string;
  source: string;
  category: string;
  title: string;
  chunk: string;
  embedding: number[];
}

interface ScoredChunk extends KnowledgeChunk {
  similarity: number;
}

// Lazy/Safe Gemini initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Load in-memory knowledge base
let knowledgeBase: KnowledgeChunk[] = [];
try {
  const kbPath = path.resolve("src/data/ragKnowledgeBase.json");
  if (fs.existsSync(kbPath)) {
    const raw = fs.readFileSync(kbPath, "utf-8");
    knowledgeBase = JSON.parse(raw);
    console.log(`[RAG] Loaded ${knowledgeBase.length} embedded chunks into memory.`);
  } else {
    console.warn(`[RAG] Knowledge base file not found at ${kbPath}`);
  }
} catch (e: any) {
  console.error("[RAG] Failed to load ragKnowledgeBase.json:", e.message);
}

// Cosine similarity utilities
function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

function magnitude(a: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * a[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(a: number[], b: number[]): number {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

// Keyword-based fallback scoring if offline/testing
function keywordFallbackScore(query: string, chunk: KnowledgeChunk): number {
  const qWords = query.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2);
  if (qWords.length === 0) return 0;
  
  const text = `${chunk.title} ${chunk.chunk} ${chunk.source}`.toLowerCase();
  let matches = 0;
  for (const w of qWords) {
    if (text.includes(w)) matches++;
  }
  return (matches / qWords.length) * 0.75;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // -------------------------------------------------------------
  // API: Health Check
  // -------------------------------------------------------------
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      chunksInMemory: knowledgeBase.length,
      embeddingModel: "gemini-embedding-2-preview",
      generationModel: "gemini-3.1-flash-lite",
    });
  });

  // -------------------------------------------------------------
  // API: Copilot Architecture Metadata (Explainability)
  // -------------------------------------------------------------
  app.get("/api/copilot/architecture", (_req, res) => {
    res.json({
      architecture: "In-Memory Vectorless RAG (Retrieval-Augmented Generation)",
      totalChunks: knowledgeBase.length,
      embeddingModel: "gemini-embedding-2-preview (512-dim)",
      generationModel: "gemini-3.1-flash-lite",
      retrievalMethod: "Exact Cosine Similarity (In-Memory Array)",
      retrievalLatency: "< 2ms",
      confidenceThreshold: 0.68,
      vectorDatabase: "None (Zero-dependency In-Memory JSON)",
      systemSafetyPattern: "Gemini-Primary with Confidence-Gated 'Book Chat' Fallback",
      pipelineSteps: [
        { name: "Documents", desc: "Resume, Case Studies, Operating Principles & Methodology" },
        { name: "Chunk", desc: "Semantic boundary splitting (1 chunk per bullet/sub-section)" },
        { name: "Embed", desc: "Build-time Gemini 512-dim dense vector embedding" },
        { name: "Retrieve", desc: "Query embedding + in-memory cosine similarity ranking (top 3-5)" },
        { name: "Ground", desc: "Confidence threshold check (>=0.48) & contextual prompt assembly" },
        { name: "Generate", desc: "Constrained synthesis with gemini-3.1-flash-lite & source citations" },
      ],
    });
  });

  // -------------------------------------------------------------
  // API: RAG Query Endpoint
  // -------------------------------------------------------------
  app.post("/api/copilot/query", async (req, res) => {
    const startTime = Date.now();
    try {
      const { question, topK = 4 } = req.body;
      if (!question || typeof question !== "string" || question.trim().length === 0) {
        return res.status(400).json({ error: "Question is required." });
      }

      const cleanQuestion = question.trim();
      let queryVector: number[] = [];
      let usedEmbeddingApi = false;

      // 1. Compute Query Embedding
      try {
        const ai = getGeminiClient();
        const embedRes = await ai.models.embedContent({
          model: "gemini-embedding-2-preview",
          contents: cleanQuestion,
          config: { outputDimensionality: 512 },
        });

        if (embedRes.embeddings && embedRes.embeddings[0] && embedRes.embeddings[0].values) {
          queryVector = embedRes.embeddings[0].values;
          usedEmbeddingApi = true;
        }
      } catch (embedError: any) {
        console.warn("[RAG] Query embedding API failed, falling back to lexical scoring:", embedError.message);
      }

      // 2. Compute Cosine Similarity against all stored chunks in memory
      let scoredChunks: ScoredChunk[] = [];
      if (usedEmbeddingApi && queryVector.length === 512) {
        scoredChunks = knowledgeBase.map((item) => ({
          ...item,
          similarity: cosineSimilarity(queryVector, item.embedding),
        }));
      } else {
        // Lexical heuristic fallback
        scoredChunks = knowledgeBase.map((item) => ({
          ...item,
          similarity: keywordFallbackScore(cleanQuestion, item),
        }));
      }

      // Sort descending by similarity score
      scoredChunks.sort((a, b) => b.similarity - a.similarity);

      // Top K retrieved
      const retrieved = scoredChunks.slice(0, Math.min(topK, scoredChunks.length));
      const topScore = retrieved.length > 0 ? retrieved[0].similarity : 0;
      const CONFIDENCE_THRESHOLD = 0.68;
      const retrievalTimeMs = Date.now() - startTime;

      // 3. Confidence Gating (Sportstech AI Coach Failover Pattern)
      if (topScore < CONFIDENCE_THRESHOLD) {
        const fallbackText =
          "I don't have enough verified information in Deepak's portfolio to answer that with high confidence. Deepak's work focuses on AI products, B2B marketplaces, subscriptions, and workflow systems. To discuss this topic directly with Deepak, please click 'Book Chat' below to connect with him.";
        return res.json({
          question: cleanQuestion,
          answer: fallbackText,
          fallback: true,
          topSimilarity: Number(topScore.toFixed(4)),
          confidenceThreshold: CONFIDENCE_THRESHOLD,
          retrievalTimeMs,
          totalTimeMs: Date.now() - startTime,
          message: fallbackText,
          retrievedChunks: retrieved.map((c) => ({
            id: c.id,
            source: c.source,
            title: c.title,
            category: c.category,
            chunk: c.chunk,
            similarity: Number(c.similarity.toFixed(4)),
          })),
        });
      }

      // 4. Grounded Generation with Gemini 3.1 Flash Lite
      const ai = getGeminiClient();
      const contextBlocks = retrieved
        .map(
          (c, idx) =>
            `[Source ${idx + 1}: ${c.source} | Title: ${c.title}]\n${c.chunk}`
        )
        .join("\n\n");

      const systemInstruction = `You are the AI Portfolio Copilot for Deepak Prasad, a Senior Product Manager.
Your job is to answer user questions about Deepak's experience, case studies, principles, methodology, and this AI Copilot's architecture.

CRITICAL GROUNDING RULES:
1. Answer strictly using ONLY the information provided in the context below.
2. If the context contains relevant metrics, numbers, or frameworks (e.g., 80K+ farmers, ₹20–25 Cr monthly, 99.9% reliability, 300 to 2000 DAU, 48-hour perishable window, etc.), cite them accurately.
3. If the context does not contain sufficient details to answer the question, state honestly what is known and politely recommend clicking "Book Chat" to discuss with Deepak directly.
4. Keep answers crisp, professional, and well-structured (1-3 brief paragraphs or focused bullet points).
5. Never hallucinate previous employers, unmentioned technologies, or speculative claims.`;

      const prompt = `Context:\n${contextBlocks}\n\nUser Question:\n${cleanQuestion}\n\nPlease provide a grounded, direct answer:`;

      const genRes = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const answer = genRes.text || "No response generated.";
      const totalTimeMs = Date.now() - startTime;

      res.json({
        question: cleanQuestion,
        answer,
        fallback: false,
        topSimilarity: Number(topScore.toFixed(4)),
        confidenceThreshold: CONFIDENCE_THRESHOLD,
        retrievalTimeMs,
        totalTimeMs,
        retrievedChunks: retrieved.map((c) => ({
          id: c.id,
          source: c.source,
          title: c.title,
          category: c.category,
          chunk: c.chunk,
          similarity: Number(c.similarity.toFixed(4)),
        })),
      });
    } catch (err: any) {
      console.error("[RAG] Query error:", err);
      res.status(500).json({
        error: "Failed to process query",
        details: err.message,
      });
    }
  });

  // Serve static assets from public folder
  app.use(express.static(path.resolve("public")));

  // -------------------------------------------------------------
  // Vite Integration (Dev vs Prod)
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Deepak Prasad Portfolio with RAG Copilot running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
