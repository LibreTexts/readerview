/**
 * Generate the 'tools' menu in the toolbar.
 * 'Tools' acts as a catch-all for any features
 * that don't fit into the other menus.
 */

import ls from 'localstorage-slim';

function initToolsLinks(id) {
  const toolbarMenu = document.querySelector('#tools-menu');
  const toolsMenuDropdown = document.querySelector('#dropdown_tools');
  const pageID = document.querySelector('#pageIDHolder').innerText;

  const { commons } = ls.get(id) || {};

  let siteTools = [
    {
      "name": "Adapt Homework System",
      "url": "https://adapt.libretexts.org/",
      "type": 'link',
    },
    {
      "name": "Jupyter Hub",
      "url": "https://jupyter.libretexts.org/hub/login",
      "type": 'link',
    },
    {
      "name": "OER Remixer",
      "url": `https://${window.location.host}/Under_Construction/Development_Details/OER_Remixer`,
      "type": 'link',
    },
    {
      "name": "Libre Commons",
      "url": "https://commons.libretexts.org/",
      "type": 'link',
    },
    {
      "name": "Get Page Source",
      "url": `https://${window.location.host}/Under_Construction/Sandboxes/Henry/Get_Contents?${pageID}`,
      "type": 'link',
    },
    {
      "name": "Toggle Auto Attribution",
      "url": '',
      "type": 'script',
      "action": 'LibreTexts.active.libreLens()'
    },
    {
      "name": "Find Book in Commons",
      "url": `https://commons.libretexts.org/book/${commons ? commons.bookID : ''}`,
      "type": 'link',
    }
  ];

  
  if (toolbarMenu) {
    const buildToolsLinks = (link, title) => {
      return `<li><a href="${link}" class="toolbar-btn toolbar-inner" target="_blank"><span>${title}</span></a></li>`
    }
    const buildScriptLink = (script, title) => {
      return `<li><a href="?toolbarlink" class="toolbar-btn toolbar-inner" onclick="event.preventDefault(); ${script}"><span>${title}</span></a></li>`
    }
    siteTools.forEach(item => {
      if (item.type === 'script') {
        const element = buildScriptLink(item.action, item.name);
        toolsMenuDropdown.innerHTML += element;
      } else {
        const element = buildToolsLinks(item.url, item.name);
        toolsMenuDropdown.innerHTML += element;
      }
      
    })
  } else {
    console.warn('[ReaderView]: Tools Menu not found');
    return
  }
}


export {
  initToolsLinks,
}