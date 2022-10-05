/**
 * Attaches event handlers to Download dropdown buttons using the download links stored
 * in the global 'current' LibreText object.
 */
import ls from 'localstorage-slim';

function initDownloadButtons() {

  let downloads = ls.get('current').downloads;
  console.log(downloads);

  if (downloads) {
    const fullDownloadBtn = document.getElementById('download_pdf_full');
    const pageDownloadBtn = document.getElementById('download_pdf_page');
    const orderBookBtn = document.getElementById('download_orderbook');


    if (downloads.pdf.full) {
      fullDownloadBtn.disabled = false;
      fullDownloadBtn.addEventListener('click', () => {
        window.open(downloads.pdf.full, '_blank', 'noreferrer');
      });
    } else if (!downloads.pdf.full) {
      setErrorModal(fullDownloadBtn);
    }

    if (downloads.pdf.page)  {
      pageDownloadBtn.disabled = false;
      pageDownloadBtn.addEventListener('click', () => {
        window.open(downloads.pdf.page, '_blank', 'noreferrer');
      });      
    } else if (!downloads.pdf.page) {
      setErrorModal(pageDownloadBtn);
    }

    if (downloads.bookstore) {
      orderBookBtn.disabled = false;
      orderBookBtn.addEventListener('click', () => {
        window.open(downloads.bookstore, '_blank', 'noreferrer');
      });
    } else if (!downloads.bookstore) {
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
