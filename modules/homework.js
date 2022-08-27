/**
 * Activates the Homework button if ADAPT course information is found in the
 * global 'current' LibreText object.
 */
function initHomeworkButton() {
  const homeworkButton = document.getElementById('open_homework');
  if (LibreTexts.current?.commons?.hasAdaptCourse && homeworkButton) {
    const courseID = LibreTexts.current.commons.adaptCourseID;
    homeworkButton.classList.remove('disabled-header-btn');
    homeworkButton.disabled = false;
    homeworkButton.addEventListener('click', () => {
      window.open(
        `https://adapt.libretexts.org/courses/${courseID}/anonymous`,
        '_blank',
        'noreferrer',
      );
    });
  }
}

export {
  initHomeworkButton,
}
