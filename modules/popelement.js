/**
 * Builds a draggable, resizable, expanding element
 * that renders an external page in an iframe.
 * 
 * @param {string} url - URL to load in the iframe
 * @param {string} title - used to add a <h2> in the popup element.
 * @param {string} style - sets the color/styling for the popup; options: ['default','warning']
 * @param {string} size - initial size of the popup; options: ['default','small','large']
 */

function createPop(url, title, style, size){
  //let popWrapper = document.createElement('div');
  const markup = 
  `<div id="pop" class="pop-${style} pop-${size}">
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