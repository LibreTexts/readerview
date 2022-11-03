import ls from 'localstorage-slim';

function performSearch() {


  const searchPanel = document.getElementById('search');
  const searchLabel = searchPanel.querySelector('label');
  const searchForm = document.querySelector('#book_search');
  const searchBtn = document.querySelector('#searchButton');
  let searchScope = '';
  let searchLocation = 'https://' + window.location.host + '/Special:Search?readerView&qid=&fpid=&fpth=&type=wiki&query=';

  let { flat, structured } = ls.get('toc') || {};


  if (!flat && !structured) {
    searchLabel.innerHTML = 'Search by Keyword';
  } else {
    searchScope = `&path=${flat[0].path}`;
  }

  ["click", "keypress"].forEach(ev=>{
    searchBtn.addEventListener(ev, function(e){
      e.preventDefault();

      if (e.keyCode === 13) {
        getKeywords();
      }

      if (ev == 'click'){
        
        console.log(searchScope);
        window.open(`${searchLocation}${getKeywords()}${searchScope}`, '_blank', 'noreferrer');
      }
    });

  });

}

function getKeywords() {
  let searchBar = document.querySelector('#searchBar');
  //let keywords = searchBar.value.split(',');
  let keywords = searchBar.value;
  console.log(keywords);
  return keywords;
}

export { performSearch };