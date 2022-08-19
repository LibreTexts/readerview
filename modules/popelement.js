function createPop(url, title, style, size){
  //let popWrapper = document.createElement('div');
  const markup = 
  `<div id="pop" class="">
  	<div class="pop-header">
    	<h2 class="pop-tite">${title}</h2>
      <div class="pop-controls">
      	<span class="pop-minimize">-</span>
        <span class="pop-expand">></span>
      	<span class="pop-close">X</span>
      </div>
    </div>
    <div class="pop-body">
    	<iframe src="${url}" title="${title}" allowfullscreen frameborder="0"></iframe>
    </div>
  </div>`;
  
  //return markup;
  
  document.body.insertAdjacentHTML('beforeend', markup);
}

//createPop('https://studio.libretexts.org/h5p/6623/embed','Test','default','default');

function minimizePop(){
}

function expandPop(){
}

function closePop(){
}

export { createPop, minimizePop, expandPop, closePop };