import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FlowerBloomSectionProps {
  onOpenContact?: () => void;
}

export default function FlowerBloomSection({ onOpenContact }: FlowerBloomSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0A0A0B");

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8.6);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene.add(new THREE.AmbientLight("#F6B5A0", 1.2));
    const key = new THREE.DirectionalLight("#FFE1D2", 4.2);
    key.position.set(-3, 4, 6);
    scene.add(key);
    const rim = new THREE.PointLight("#B85F4B", 7, 14);
    rim.position.set(3, -1, 2);
    scene.add(rim);

    const flower = new THREE.Group();
    scene.add(flower);

    const petalMaterial = new THREE.MeshPhysicalMaterial({
      color: "#F0977A",
      roughness: 0.42,
      metalness: 0,
      transmission: 0.03,
      clearcoat: 0.18,
      clearcoatRoughness: 0.32,
      side: THREE.DoubleSide,
    });
    const innerMaterial = petalMaterial.clone();
    innerMaterial.color.set("#F8C4B0");
    innerMaterial.roughness = 0.32;

    const petalGeometry = new THREE.SphereGeometry(1, 28, 18);
    const petals: THREE.Mesh[] = [];
    const petalCount = 28;

    for (let i = 0; i < petalCount; i += 1) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeometry, i % 3 === 0 ? innerMaterial : petalMaterial);
      petal.scale.set(0.62, 1.62, 0.16);
      petal.position.set(Math.cos(angle) * 1.02, Math.sin(angle) * 1.02, 0);
      petal.rotation.z = angle - Math.PI / 2;
      petal.rotation.x = -0.35 + Math.sin(angle * 2) * 0.12;
      petal.userData = { angle, radius: 1.02, index: i };
      flower.add(petal);
      petals.push(petal);
    }

    const innerGeometry = new THREE.SphereGeometry(1, 24, 16);
    for (let i = 0; i < 14; i += 1) {
      const angle = (i / 14) * Math.PI * 2;
      const petal = new THREE.Mesh(innerGeometry, innerMaterial);
      petal.scale.set(0.42, 1.12, 0.13);
      petal.position.set(Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, 0.32);
      petal.rotation.z = angle - Math.PI / 2;
      petal.rotation.x = -0.58;
      flower.add(petal);
      petals.push(petal);
    }

    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 32, 24),
      new THREE.MeshPhysicalMaterial({ color: "#B85F4B", roughness: 0.5, clearcoat: 0.25 }),
    );
    center.position.z = 0.42;
    flower.add(center);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 32, 20),
      new THREE.MeshBasicMaterial({ color: "#F0977A", transparent: true, opacity: 0.055, blending: THREE.AdditiveBlending }),
    );
    flower.add(glow);

    const resize = () => {
      const width = canvas.clientWidth || canvas.parentElement?.clientWidth || 600;
      const height = canvas.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let progress = 0;
    let targetProgress = 0;
    let raf = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      targetProgress = THREE.MathUtils.clamp(-rect.top / range, 0, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const animate = () => {
      raf = window.requestAnimationFrame(animate);
      progress = THREE.MathUtils.lerp(progress, targetProgress, reducedMotion ? 1 : 0.075);
      const bloom = THREE.MathUtils.smoothstep(progress, 0.05, 0.62);
      const spread = THREE.MathUtils.lerp(0.48, 1.18, bloom);

      petals.forEach((petal, index) => {
        const data = petal.userData as { angle?: number; radius?: number; index?: number };
        const angle = data.angle ?? 0;
        const radius = (data.radius ?? 1) * spread;
        petal.position.x = Math.cos(angle) * radius;
        petal.position.y = Math.sin(angle) * radius;
        petal.position.z = THREE.MathUtils.lerp(0.18, 0, bloom) + Math.sin(frame * 0.008 + index) * 0.018;
        petal.scale.y = THREE.MathUtils.lerp(0.72, 1.62, bloom);
        petal.rotation.z = angle - Math.PI / 2 + Math.sin(frame * 0.004 + index) * 0.025;
      });

      flower.rotation.z = THREE.MathUtils.lerp(-0.35, 0.12, progress);
      flower.rotation.x = THREE.MathUtils.lerp(0.55, 0.08, progress);
      flower.rotation.y = Math.sin(frame * 0.0025) * 0.055;
      flower.scale.setScalar(THREE.MathUtils.lerp(0.48, 1.08, bloom));
      flower.position.y = THREE.MathUtils.lerp(-1.2, 0.05, progress);
      glow.scale.setScalar(THREE.MathUtils.lerp(0.65, 1.2, bloom));
      camera.position.x = THREE.MathUtils.lerp(0.65, 0, progress);
      camera.position.y = THREE.MathUtils.lerp(0.45, 0.2, progress);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frame += 1;
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      petals.forEach((petal) => petalGeometry.dispose());
      innerGeometry.dispose();
      petalMaterial.dispose();
      innerMaterial.dispose();
      center.geometry.dispose();
      (center.material as THREE.Material).dispose();
      glow.geometry.dispose();
      (glow.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[230vh] overflow-clip bg-[#0A0A0B]" aria-label="Ideas in bloom">
      <div className="sticky top-0 flex h-screen min-h-[620px] flex-col justify-between overflow-hidden px-6 py-7 md:px-12 md:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_48%,rgba(240,151,122,0.12),transparent_58%)]" />
        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Deepak Prasad</span>
          <span>Scroll to bloom ———</span>
        </div>
        <div className="relative flex flex-1 items-center">
          <div className="relative z-20 max-w-[420px] space-y-6 pt-16 md:pt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">The closing thought</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#f1e9dc]">Ideas in<br />bloom.</h2>
            <p className="max-w-[300px] text-sm leading-6 text-white/50">I turn complex problems into products people love to use.</p>
            <button type="button" onClick={onOpenContact} className="rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F0977A] hover:text-[#F0977A]">Let’s talk ↗</button>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[3vw]">
            <canvas ref={canvasRef} className="h-full w-full max-w-[900px]" aria-label="A realistic three-dimensional coral flower blooming as you scroll" role="img" />
          </div>
        </div>
        <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
          <span>From complexity to impact</span>
          <span>Deepak Prasad · 2026</span>
        </div>
      </div>
    </section>
  );
}
