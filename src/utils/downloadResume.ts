export const RESUME_PDF_URL = '/Deepak_Prasad_Senior_Product_Manager_Resume.pdf';
export const RESUME_FILENAME = 'Deepak_Prasad_Senior_Product_Manager_Resume.pdf';

/**
 * Downloads the exact attached resume PDF directly without opening new tabs or modifying content.
 */
export async function downloadResumePDF(): Promise<{ success: boolean }> {
  try {
    const response = await fetch(RESUME_PDF_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = RESUME_FILENAME;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);

    return { success: true };
  } catch (err) {
    console.warn("Direct blob download failed, triggering standard anchor download:", err);
    try {
      const link = document.createElement('a');
      link.href = RESUME_PDF_URL;
      link.download = RESUME_FILENAME;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 1000);
      return { success: true };
    } catch (fallbackErr) {
      console.error("Download failed:", fallbackErr);
      return { success: false };
    }
  }
}
