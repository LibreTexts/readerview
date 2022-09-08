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
    	<h2 class="pop-title" tabindex="0">${title}</h2>
      <div class="pop-controls">
      	<span tabindex="0" class="pop-minimize" data-tippy-content="Minimize Panel"><span class="material-symbols-outlined">expand_more</span></span>
        <span tabindex="0" class="pop-open hidden" data-tippy-content="Open Panel"><span class="material-symbols-outlined">expand_less</span></span>
        <span tabindex="0" class="pop-expand" data-tippy-content="Expand Panel"><span class="material-symbols-outlined">open_in_full</span></span>
      	<span tabindex="0" class="pop-close" data-tippy-content="Close Panel"><span class="material-symbols-outlined">close</span></span>
      </div>
    </div>
    <div class="pop-body" data-iframe-height="iFrameResizer">
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
    
    ["click", "keypress"].forEach(ev=>{
      btn.addEventListener(ev, function(e){
        e.preventDefault();
        if (e.keyCode === 13) {
          closePop();
          renderPopElement(src, title);
        }
        if (ev == 'click'){
          closePop();
          renderPopElement(src, title);
        }
      });
    });
  });
}

function renderPopElement(src, title) {
  const popElement = buildPopElement(src, title);
  document.body.insertAdjacentHTML('beforeend', popElement);
  //iFrameResize({ scrolling: 'true', log: false, heightCalculationMethod: 'taggedElement' }, '#pop-iframe');
  iframeHeight();
  dragElement(document.getElementById("pop"));
  tippy('[data-tippy-content]');
  document.querySelector('h2.pop-title').focus();


  ["click", "keypress"].forEach(ev=>{
    document.querySelector('.pop-expand').addEventListener(ev, expandPop);
    document.querySelector('.pop-close').addEventListener(ev, closePop);
    document.querySelector('.pop-minimize').addEventListener(ev, minimizePop);
    document.querySelector('.pop-open').addEventListener(ev, minimizePop);
  });

  

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
function iframeHeight() {
  const p = document.querySelector('#pop').scrollHeight;
  const b = document.querySelector('.pop-header').scrollHeight;
  document.querySelector('.pop-body iframe').style.height = (p-b) + 'px';
}

function minimizePop(e){
  e.preventDefault();
  document.querySelector('#pop').style.top = null;
  document.querySelector('#pop').style.left = null;
  document.querySelector('#pop').classList.toggle('minimized');
  document.querySelector('.pop-expand').classList.toggle('hidden');
  document.querySelector('.pop-minimize').classList.toggle('hidden');
  document.querySelector('.pop-open').classList.toggle('hidden');
  if (!document.querySelector('#pop').classList.contains('minimized')) {
    dragElement(document.getElementById("pop"));
  } else {
    dragElement();
  }
  
}

function expandPop(e){
  e.preventDefault();
  document.querySelector('#pop').classList.toggle('expanded');
  iframeHeight();
}

function closePop(e){
  const pop = document.querySelector('#pop');
  if (pop) {
    pop.remove();
    let r = document.querySelector('button#resources');
    if (r) {
      r.focus();
    } else {
      document.querySelector('button#toggle_tools');
    }
  }
  
}

export { initPopButtons };