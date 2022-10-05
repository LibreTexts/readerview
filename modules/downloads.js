/**
 * Attaches event handlers to Download dropdown buttons using the download links stored
 * in the global 'current' LibreText object.
 */
import ls from 'localstorage-slim';

function initDownloadButtons() {

  if (LibreTexts.current?.downloads) {
    const fullDownloadBtn = document.getElementById('download_pdf_full');
    const pageDownloadBtn = document.getElementById('download_pdf_page');
    const orderBookBtn = document.getElementById('download_orderbook');
    const downloadLinks = LibreTexts.current.downloads;

    if (downloadLinks.pdf.full) {
      fullDownloadBtn.disabled = false;
      fullDownloadBtn.addEventListener('click', () => {
        window.open(downloadLinks.pdf.full, '_blank', 'noreferrer');
      });
    } else if (!downloadLinks.pdf.full) {
      setErrorModal(fullDownloadBtn);
    }

    if (downloadLinks.pdf.page)  {
      pageDownloadBtn.disabled = false;
      pageDownloadBtn.addEventListener('click', () => {
        window.open(downloadLinks.pdf.page, '_blank', 'noreferrer');
      });      
    } else if (!downloadLinks.pdf.page) {
      setErrorModal(pageDownloadBtn);
    }

    if (downloadLinks.bookstore) {
      orderBookBtn.disabled = false;
      orderBookBtn.addEventListener('click', () => {
        window.open(downloadLinks.bookstore, '_blank', 'noreferrer');
      });
    } else if (!downloadLinks.bookstore) {
      setErrorModal(orderBookBtn);
    }

  }
}

function setErrorModal(element){
  element.setAttribute('data-micromodal-trigger', 'modal-main');
  element.addEventListener('click', () => {
    MicroModal.show('modal-main');
    document.getElementById('modal-main-title').innerHTML = 'Downloads';
    document.getElementById('modal-main-body').innerHTML = `<p>This action is not available.</p>`;
  });
}

export {
  initDownloadButtons
}
