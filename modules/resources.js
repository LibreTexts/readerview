/**
 * Builds menu items for 'toolbar' from list
 * of resources made available for book in Commons
 */

import ls from 'localstorage-slim';

function initResourceLinks(id) {
  
  // get current book data from localstorage
  const { commons } = ls.get(id) || {};

  // check if resources exist
  if (!commons) {
    console.warn('[ReaderView]: Could not find resource in Commons.');
    return;
  }
  if (commons.hasReaderResources == false) {
    console.info('[ReaderView]: No resources listed in Commons.');
    return
  }

  // get parent element
  const resourceMenuDropdown = document.querySelector('#dropdown_resources');

  // builds a new menu item
  const buildResourceLinks = (link, title) => {
    return `<li><button aria-controls="pop" aria-expanded="false" class="toolbar-btn toolbar-inner" data-src="${link}" data-title="${title}" data-type="popelement"><span>${title}</span></button></li>`
  }

  // iterate through resources and build+append them to menu
  commons.readerResources.forEach(resource => {
    const element = buildResourceLinks(resource.url, resource.name);
    resourceMenuDropdown.innerHTML += element;
  });
}


export {
  initResourceLinks,
}
