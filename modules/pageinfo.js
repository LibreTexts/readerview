let Page = {};
function getPageObj(){
  

  Page.title = document.getElementById('titleHolder').innerText;
  Page.modified = [];
  Page.modified.dateTime = document.getElementById('modifiedHolder').innerText;
  Page.pageId = document.getElementById('IDHolder').innerText;
  if (document.querySelector('.mt-author-information')) {
    Page.authorDisplayName = document.querySelector('.mt-author-information a') ? document.querySelector('.mt-author-information a').innerText : 'Anonymous';
    Page.authorLink = document.querySelector('.mt-author-information a') ? document.querySelector('.mt-author-information a').getAttribute('href') : 'https://libretexts.org';
  }
  Page.parentTitle = document.getElementById('parentTitleHolder').innerText;
  Page.parentParentTitle = document.getElementById('parentParentTitleHolder').innerText;

  let dateTime = new Date(Page.modified.dateTime);
  Page.modified.modifiedDate = dateTime.toLocaleDateString();
  Page.modified.modifiedTime = dateTime.toLocaleTimeString();
  return Page;
}

export { Page, getPageObj }