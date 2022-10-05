/**
 * Activates the Feedback/Peer Review button if data from LibreCommons indicates they are accepted.
 */
function initFeedbackButton() {
  const feedbackBtn = document.getElementById('feedback');
  const commonsData = LibreTexts.current?.commons;
  if (
    commonsData
    && (commonsData.hasPeerReviews || commonsData.allowAnonPR)
    && feedbackBtn
  ) {
    feedbackBtn.classList.remove('hidden');
    feedbackBtn.disabled = false;
    feedbackBtn.addEventListener('click', () => {
      const commonsURL = `https://commons.libretexts.org/book/${commonsData.bookID}`;
      window.open(`${commonsURL}?peerreview=show`, '_blank', 'noreferrer');
    }); 
  }
}

export {
  initFeedbackButton,
}
