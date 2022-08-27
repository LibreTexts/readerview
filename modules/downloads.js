/**
 * Attaches event handlers to Download dropdown buttons using the download links stored
 * in the global 'current' LibreText object.
 */
function initDownloadButtons() {
  if (LibreTexts.current?.downloads) {
    const pdfLinks = LibreTexts.current.downloads.pdf;
    const fullDownloadBtn = document.getElementById('download_pdf_full');
    const pageDownloadBtn = document.getElementById('download_pdf_page');
    if (pdfLinks.full && fullDownloadBtn) {
      fullDownloadBtn.classList.remove('disabled-btn');
      fullDownloadBtn.disabled = false;
      fullDownloadBtn.addEventListener('click', () => {
        window.open(pdfLinks.full, '_blank', 'noreferrer');
      });
    }
    if (pdfLinks.page && pageDownloadBtn)  {
      pageDownloadBtn.classList.remove('disabled-btn');
      pageDownloadBtn.disabled = false;
      pageDownloadBtn.addEventListener('click', () => {
        window.open(pdfLinks.page, '_blank', 'noreferrer');
      });      
    }
  }
}

export {
  initDownloadButtons
}
