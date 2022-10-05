/**
 * Attaches event handlers to Download dropdown buttons using the download links stored
 * in the global 'current' LibreText object.
 */
function initDownloadButtons() {
  if (LibreTexts.current?.downloads) {
    const fullDownloadBtn = document.getElementById('download_pdf_full');
    const pageDownloadBtn = document.getElementById('download_pdf_page');
    const pdfLinks = LibreTexts.current.downloads.pdf;
    if (pdfLinks.full && fullDownloadBtn) {
      fullDownloadBtn.disabled = false;
      fullDownloadBtn.removeAttribute('data-micromodal-trigger');
      fullDownloadBtn.removeAttribute('data-type');
      fullDownloadBtn.addEventListener('click', () => {
        window.open(pdfLinks.full, '_blank', 'noreferrer');
      });
    }
    if (pdfLinks.page && pageDownloadBtn)  {
      pageDownloadBtn.disabled = false;
      pageDownloadBtn.removeAttribute('data-micromodal-trigger');
      pageDownloadBtn.removeAttribute('data-type');
      pageDownloadBtn.addEventListener('click', () => {
        window.open(pdfLinks.page, '_blank', 'noreferrer');
      });      
    }
  }
}

export {
  initDownloadButtons
}
