let Page = {};
function getPageObj(){
  

  Page.title = document.getElementById('titleHolder').innerText;
  Page.modified = [];
  Page.modified.dateTime = document.getElementById('modifiedHolder').innerText;
  Page.pageId = document.getElementById('IDHolder').innerText;
  Page.authorDisplayName = document.querySelector('.mt-author-information a').innerText;
  Page.authorLink = document.querySelector('.mt-author-information a').getAttribute('href');
  Page.parentTitle = document.getElementById('parentTitleHolder').innerText;
  Page.parentParentTitle = document.getElementById('parentParentTitleHolder').innerText;

  let dateTime = new Date(Page.modified.dateTime);
  Page.modified.modifiedDate = dateTime.toLocaleDateString();
  Page.modified.modifiedTime = dateTime.toLocaleTimeString();

  console.log(Page);

  return Page;
}

export { Page, getPageObj }