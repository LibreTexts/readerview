/**
 * Renders the Table of Contents into the off-canvas menu.
 *
 * @returns {Promise<void>}
 */
async function renderTableOfContents() {
  const { structured } = await LibreTexts.getTOC();
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
        const grandchildren = buildListView(item);
        return `
          <li class="${((currentPageId == item.id) ? `m-${item.id} active` : `m-${item.id}`)}">
            <span>
              <a href="/${item.path}?readerView">${item.title}</a>
            </span>
            ${grandchildren}
          </li>
        `;
      }).filter((item) => item !== null);
      /** 
       * ToDo:
       * - set current page's parent ul as active if current page is subpage
       */
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

  const toc = buildListView(structured);
  container.innerHTML = toc;
}

export {
  renderTableOfContents,
}
