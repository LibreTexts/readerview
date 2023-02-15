/**
 * Generate the 'tools' menu in the toolbar.
 * 'Tools' acts as a catch-all for any features
 * that don't fit into the other menus.
 */

function initToolsLinks() {
  const toolbarMenu = document.querySelector('#tools-menu');
  const toolsMenuDropdown = document.querySelector('#dropdown_tools');
  const pageID = document.querySelector('#pageIDHolder').innerText;

  let siteTools = [
    {
      "name": "Adapt Homework System",
      "url": "https://adapt.libretexts.org/"
    },
    {
      "name": "Jupyter Hub",
      "url": "https://jupyter.libretexts.org/hub/login"
    },
    {
      "name": "OER Remixer",
      "url": "https://dev.libretexts.org/Under_Construction/Development_Details/OER_Remixer"
    },
    {
      "name": "Libre Commons",
      "url": "https://jupyter.libretexts.org/hub/login"
    },
    {
      "name": "Get Page Source",
      "url": `https://dev.libretexts.org/Under_Construction/Sandboxes/Henry/Get_Contents?${pageID}`
    }
  ];
  
  if (toolbarMenu) {
    const buildToolsLinks = (link, title) => {
      return `<li><a href="${link}" class="toolbar-btn toolbar-inner" target="_blank"><span>${title}</span></a></li>`
    }
    siteTools.forEach(item => {
      const element = buildToolsLinks(item.url, item.name);
      toolsMenuDropdown.innerHTML += element;
    })
  } else {
    console.warn('[ReaderView]: Tools Menu not found');
    return
  }
}


export {
  initToolsLinks,
}