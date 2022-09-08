/**
 * Renders the Table of Contents into the off-canvas menu.
 *
 * @returns {Promise<void>}
 */
async function renderTableOfContents() {
  const { flat, structured } = await LibreTexts.getTOC();
  const container = document.getElementById('offcanvas-menu');
  //const [subdomain] = LibreTexts.parseURL();
  /**
   * ToDo:
   * - set current page id in LibreTexts object
   */
  const currentPageId = document.getElementById('IDHolder').innerText;

  if (!structured || !container) {
    console.error('[ReaderView]: Error building Table of Contents.');
    return;
  }
  const buildListView = (page) => {
    if (Array.isArray(page.subpages)) {
      const children = page.subpages.map((item) => {
        let itemClasslist = [`m-${item.id}`];
        if (item.subpages){
          itemClasslist.push('expandable');
        }
        if (currentPageId == item.id){
          itemClasslist.push('active', 'expanded');
        }
        let expander = `
          <span class="toc-expander" tabindex="0">
            <span class="material-symbols-outlined">expand_more</span>
          </span>
        `;
        const grandchildren = buildListView(item);
        return `
          <li class="${itemClasslist.join(' ')}">
            <span>
              <a href="/${item.path}?readerView">${item.title}</a>
              ${item.subpages ? expander : ''}
            </span>
            ${grandchildren}
          </li>
        `;
      }).filter((item) => item !== null);
      if (children.length > 0) {
        return `
          <ul>
            ${children.join('')}
          </ul>
        `;
      }
    }
    return '';
  };

  const setActiveChapter = (toc) => {
    const page = toc.filter(item => item.id == currentPageId);
    const chapter = toc.filter(item => item.id == page[0].parentID);
    let chapterParentElement = document.querySelector(`.m-${chapter[0].id}`);
    if (chapterParentElement) {
      chapterParentElement.classList.add('active', 'expanded');
    }    
  }

  const toc = buildListView(structured);
  container.innerHTML = toc;
  const chapter = setActiveChapter(flat);
  chapter;
  initMenuExpanderButtons();
}

function initMenuExpanderButtons(){
  let buttons = document.querySelectorAll('.toc-expander');
  buttons.forEach(function(btn){
    ["click", "keypress"].forEach(ev=>{
      btn.addEventListener(ev, function(e){
        e.preventDefault();
        if (e.keyCode === 13) {
          let parent = btn.closest('li.expandable');
          let targetUL = parent.querySelector('ul');
          parent.classList.toggle('expanded');
          targetUL.classList.toggle('open');
        }
        if (ev == 'click'){
          let parent = btn.closest('li.expandable');
          let targetUL = parent.querySelector('ul');
          parent.classList.toggle('expanded');
          targetUL.classList.toggle('open');
        }
      });
    });
  });
} 

export {
  renderTableOfContents,
}
