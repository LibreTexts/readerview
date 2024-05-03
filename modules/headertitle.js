import ls from 'localstorage-slim';
async function renderHeaderTitle(id) {

  //const { flat, structured } = await LibreTexts.getTOC();
  //const { coverpage } = LibreTexts.current;

  const { coverpage, toc } = ls.get(id) || {};
  const { flat, structured } = toc || {};

  //console.log(toc);

  // const { flat, structured } = ls.get('toc') || {};
  //const { coverpage } = ls.get('current') || {};
  
  const container = document.querySelector('.header-title');
  const currentPageId = document.getElementById('IDHolder').innerText;

  console.log(`------------ current page id: ${currentPageId}`);

  if (!structured || !flat || !container) {
    console.error('[ReaderView]: Error building Header Title.');
    return;
  }

  const buildBookTitle = (book) => {
    return `<a id="bookTitle" href="${book.url}?readerView">${book.title}</a>`;
  }

  const buildChapterTitle = (toc) => {
    const page = toc.filter(item => item.id == currentPageId);
    const chapter = toc.filter(item => item.id == page[0].parentID);
    /**
     * ToDo:
     * - show only Book title on book root
     * - handle 3+ levels of heirarchy
     * - show other chapters in dropdown menu when chapter title clicked
     */
    if (chapter.length) {
      if (chapter[0].id == coverpage.id) {
        // do not show chapter title link if 1st level chapter
        return '';
      } else {
        return `
          <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
          <a id="chapterTitle" href="https://${window.location.host}/${chapter[0].path['#text']}?readerView">${chapter[0].title}</a>
        `;
      }
    }
    return '';
  }

  const bookTitle = buildBookTitle(coverpage);
  const chapterTitle = buildChapterTitle(flat);

  container.innerHTML = bookTitle;
  container.innerHTML += chapterTitle;

}


// function renderHeaderTitle() {
//   const { coverpage, toc } = LibreTexts.current;
//   const container = document.querySelector('.header-title');
//   const currentPageId = document.getElementById('IDHolder').innerText;

//   if (!toc || !container) {
//     console.error('[ReaderView]: Error building Header Title.');
//     return;
//   }

//   const buildBookTitle = (book) => {
//     return `<a id="bookTitle" href="${book.url}?readerView">${book.title}</a>`;
//   }

//   const buildChapterTitle = (toc) => {
//     const page = toc.filter(item => item.id == currentPageId);
//     const chapter = toc.filter(item => item.id == page[0].parentID);
//     /**
//      * ToDo:
//      * - show only Book title on book root
//      * - handle 3+ levels of heirarchy
//      * - show other chapters in dropdown menu when chapter title clicked
//      */
//     if (chapter[0].id == coverpage.id) {
//       // do not show chapter title link if 1st level chapter
//       return '';
//     } else {
//       return `
//         <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
//         <a id="chapterTitle" href="https://${window.location.host}/${chapter[0].path}?readerView">${chapter[0].title}</a>
//       `;
//     }
//   }

//   const bookTitle = buildBookTitle(coverpage);
//   const chapterTitle = buildChapterTitle(toc.flat);

//   container.innerHTML = bookTitle;
//   container.innerHTML += chapterTitle;

// }


export {
  renderHeaderTitle,
}
