/**
 * Renders the Table of Contents into the off-canvas menu.
 *
 * @returns {Promise<void>}
 */

import ls from 'localstorage-slim';

async function renderTableOfContents(id) {
  //const { flat, structured } = await LibreTexts.getTOC();

  const { toc } = ls.get(id) || {};
  const { flat, structured } = toc || {};

  // let { flat, structured } = ls.get('toc') || {};

  // if (!flat && !structured) {
  //   ({ flat, structured } = await LibreTexts.getTOC());
  // }

  const container = document.getElementById('toc');
  
  //const [subdomain] = LibreTexts.parseURL();
  /**
   * ToDo:
   * - set current page id in LibreTexts object
   */
  const currentPageId = document.getElementById('IDHolder').innerText;

  if (!structured || !flat || !container) {
    console.error('[ReaderView]: Error building Table of Contents.');

    return;
  }
  const buildListView = (page) => {
    if (Array.isArray(page.subpages)) {
      const children = page.subpages.map((item) => {

        // console.log(`---- buildListView(item): ${item.path}`);
        // console.log(`---- buildListView(item): ${item.path['#text']}`);


        let itemClasslist = [`m-${item.id}`];
        if (item.subpages){
          itemClasslist.push('expandable');
        }
        if (currentPageId == item.id){
          itemClasslist.push('active', 'expanded');
        }
        let expander = `
          <span class="toc-expander" tabindex="0" aria-expanded="false" aria-labelledby="toc-chapter${item.id}-label">
            <span hidden id="toc-chapter${item.id}-label">Show submenu for ${item.title}</span> 
            <span aria-hidden="true" class="icon material-symbols-outlined" focusable="false">expand_more</span>
          </span>
        `;
        const grandchildren = buildListView(item);
        
        return `
          <li class="${itemClasslist.join(' ')}">
            <span>
              <a href="/${item.path['#text']}?readerView">${item.title}</a>
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
    const chapterTop = toc.filter(item => item.id == page[0].parentID);
   
    if (chapterTop.length) {
      let chapterParentElement = document.querySelector(`.m-${chapterTop[0].id}`);
      if (chapterParentElement) {
        chapterParentElement.classList.add('active', 'expanded');
        chapterParentElement.querySelector('.toc-expander').setAttribute('aria-expanded', 'true');
        let subChapterParent = chapterParentElement.parentElement.parentElement;
        if (subChapterParent.nodeName == 'LI') {
          subChapterParent.classList.add('active', 'expanded');
          subChapterParent.querySelector('.toc-expander').setAttribute('aria-expanded', 'true');
        }
      } else {
        return;
      } 
    }
  }

  const menu = buildListView(structured);
  container.innerHTML = menu;
  container.classList.remove('hidden');
  const chapter = setActiveChapter(flat);
  chapter;
  initMenuExpanderButtons();
}

function initMenuExpanderButtons(){
  let buttons = document.querySelectorAll('.toc-expander');
  buttons.forEach(function(btn){
    ["click", "keypress"].forEach(ev=>{
      btn.addEventListener(ev, function(e){
        let expanded = this.getAttribute('aria-expanded');
        if (expanded === 'false') {
          this.setAttribute('aria-expanded', 'true')
        } else {
          this.setAttribute('aria-expanded', 'false')
        }
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
