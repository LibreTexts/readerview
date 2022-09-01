
function renderHeaderTitle() {
  const { coverpage, toc } = LibreTexts.current;
  const container = document.querySelector('.header-title');
  const currentPageId = document.getElementById('IDHolder').innerText;

  if (!toc || !container) {
    console.error('[ReaderView]: Error building Header Title.');
    return;
  }

  const buildBookTitle = (book) => {
    return `<a id="bookTitle" href="${book.url}">${book.title}</a>`;
  }

  const buildChapterTitle = (toc) => {
    const page = toc.filter(item => item.id == currentPageId);
    const chapter = toc.filter(item => item.id == page[0].parentID);

    if (chapter) {
      return `
        <span class="material-symbols-outlined">keyboard_double_arrow_right</span> <a id="chapterTitle" href="${window.location.host}/${chapter[0].path}">${chapter[0].title}</a>
      `;
    } else {
      return;
    }
  }

  const bookTitle = buildBookTitle(coverpage);
  const chapterTitle = buildChapterTitle(toc.flat);

  container.innerHTML = bookTitle;
  container.innerHTML += chapterTitle;

}


export {
  renderHeaderTitle,
}
