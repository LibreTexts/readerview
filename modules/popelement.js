/**
 * Builds a draggable, resizable, expanding element
 * that renders an external page in an iframe.
 * 
 * @param {string} url - URL to load in the iframe
 * @param {string} title - used to add a <h2> in the popup element.
 * @param {string} style - sets the color/styling for the popup; options: ['default','warning']
 * @param {string} size - initial size of the popup; options: ['default','small','large']
 */

function buildPopElement(url, title, style = 'default', size = 'default'){
  const markup = 
  `<div id="pop" class="pop-style-${style} pop-size-${size}">
  	<div class="pop-header">
    	<h2 class="pop-title">${title}</h2>
      <div class="pop-controls">
      	<span class="pop-minimize" data-tippy-content="Minimize Panel"><span class="material-symbols-outlined">expand_more</span></span>
        <span class="pop-expand" data-tippy-content="Expand Panel"><span class="material-symbols-outlined">open_in_full</span></span>
      	<span class="pop-close" data-tippy-content="Close Panel"><span class="material-symbols-outlined">close</span></span>
      </div>
    </div>
    <div class="pop-body">
    	<iframe id="pop-iframe" src="${url}" title="${title}" allowfullscreen frameborder="0"  height="100%" width="100%"></iframe>
    </div>
  </div>`;
  
  return markup;
}

function initPopButtons() {
  let popButtons = document.querySelectorAll('[data-type="popelement"]');
  popButtons.forEach(function(btn){
    const src = btn.getAttribute('data-src');
    const title = btn.getAttribute('data-title');

    btn.addEventListener('click', function(){
      renderPopElement(src, title)
    });
  });
}

function renderPopElement(src, title) {
  const popElement = buildPopElement(src, title);
  document.body.insertAdjacentHTML('beforeend', popElement);
  iFrameResize({ log: false }, '#pop-iframe')
  dragElement(document.getElementById("pop"));
  document.querySelector('.pop-expand').addEventListener('click', expandPop);
  document.querySelector('.pop-close').addEventListener('click', closePop);
  document.querySelector('.pop-minimize').addEventListener('click', minimizePop);

}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.querySelector('.pop-header').onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Using iframeresizer.js instead
// function iframeHeight() {
//   const h = document.querySelector('#pop').scrollHeight;
//   console.log(h);
//   document.querySelector('.pop-body iframe').style.height = h + 'px';
// }

function minimizePop(){
  document.querySelector('#pop').style.top = null;
  document.querySelector('#pop').style.left = null;
  document.querySelector('#pop').classList.toggle('minimized');
  document.querySelector('.pop-expand').classList.toggle('hidden');
  if (!document.querySelector('#pop').classList.contains('minimized')) {
    dragElement(document.getElementById("pop"));
  } else {
    dragElement();
  }
  
}

function expandPop(){
  document.querySelector('#pop').classList.toggle('expanded');
}

function closePop(){
  document.querySelector('#pop').remove();
}

export { initPopButtons };