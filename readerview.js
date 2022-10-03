import ClipboardJS from 'clipboard';
import MicroModal from 'micromodal';
import { Page, getPageObj } from './modules/pageinfo.js';
import { buildCite } from './modules/cite.js';
import { renderHelp } from './modules/help.js';
import { initDownloadButtons } from './modules/downloads.js';
import { initHomeworkButton } from './modules/homework.js';
import { initFeedbackButton } from './modules/feedback.js';
import { initPopButtons } from './modules/popelement.js';
import { renderTableOfContents } from './modules/contents.js';
import { renderHeaderTitle } from './modules/headertitle.js';


(function () {
  
  if (window.location.href.includes('readerView') || window.location.href.includes('readerView')) {

    // add the readerView class to the body element (used in readerView.css)
    document.body.classList.add('readerView');
  
    window.addEventListener('load', function() {
      // add logic meant for readerView Only
      appendPageLinks();
      renderTableOfContents();
    });
    window.addEventListener('libre-downloadsinfoavailable', initDownloadButtons);
    window.addEventListener('libre-commonsinfoavailable', () => {
      initHomeworkButton();
      initFeedbackButton();
    });
  }
  
  window.addEventListener('load', function() {
    // add logic for both readerView and Default
    getPageObj();
    initPopButtons();
    tippy('[data-tippy-content]');
    MicroModal.init();
    
    /**
     * ToDo:
     * - find out why current.coverpage is not available on window.load
     */
    renderHeaderTitle();
    btnEvents();
    modalClose();

    // make all .copy-button copy to clipboard from 
    // data-clipboard-target
    const clip = new ClipboardJS('.copy-button');
    clip.on('success', (e) => {
      e.trigger.innerHTML = 'Copied!';
      setTimeout(function() {
        e.trigger.innerHTML = 'Copy to clipboard';
      }, 4000);
    });
  });

  
  function appendPageLinks() {
    // add the readerView parameter to specific URLs on page
    // to ensure user does not accidently nav away from readerView

    let pageLinks = [
      'a.internal',
      'a[rel="internal"]',
      '#nextButton',
      '#backButton',
      '.mt-icon-previous-article',
      '.mt-icon-next-article'
    ];

    pageLinks.forEach(function(sel){
      let el = document.querySelectorAll(sel)
      el.forEach(function(target){
        if (target.href.includes('libretexts.org') && !(target.href.includes('?readerView'))){
          target.href += '?readerView';
        }
      });
    });
  }

  function btnEvents() {
    // Handles events for all layout buttons

    // Modals
    let modalButtons = document.querySelectorAll('[data-type="modal"]');
    modalButtons.forEach(function(btn){
      //let target = btn.getAttribute('data-target');
      let title = btn.getAttribute('data-modal-title');
      //let target_element = document.getElementById('modal-main');
      let modalBodyMethod = btn.getAttribute('data-modal-src');

      ["click", "keypress"].forEach(ev=>{
        btn.addEventListener(ev, function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            //document.getElementById(target).classList.toggle('open');
            MicroModal.show('modal-main');
            document.getElementById('modal-main-title').innerHTML = title;
            //target_element.querySelector('h2:first-of-type').focus();
          }
          if (ev == 'click') {
            //document.getElementById(target).classList.toggle('open');
            MicroModal.show('modal-main');
            document.getElementById('modal-main-title').innerHTML = title;
          }
          switch (modalBodyMethod) {
            case 'cite':
              //target_element.querySelector('.modal-body').innerHTML = buildCite(Page);
              document.getElementById('modal-main-body').innerHTML = buildCite(Page);
              break;
            
            case 'help':
              document.getElementById('modal-main-body').innerHTML = renderHelp();
                break;
          
            default:
              console.log("error");
              break;
          }

        });
      });
    });

    // Div Collapse
    let collapseButtons = document.querySelectorAll('[data-type="collapse"]');
    collapseButtons.forEach(function(btn){
      let target = btn.getAttribute('data-target');
      let target_element = document.getElementById(target);

      ["click", "keypress"].forEach(ev=>{
        btn.addEventListener(ev, function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            this.classList.toggle('active');
            target_element.classList.toggle('open');
            target_element.querySelector('a:first-of-type, button:first-of-type').focus();
          }
          if (e.keyCode === 27) {
            this.classList.remove('active');
            target_element.classList.remove('open');
            this.focus();
          }
          if (ev == 'click'){
            this.classList.toggle('active');
            target_element.classList.toggle('open');
          }
        });
      });
    });

    // Dropdown Menus
    let dropdownButtons = document.querySelectorAll('[data-type="dropdown"]');
    dropdownButtons.forEach(function(btn){
      let target = btn.getAttribute('data-target');

      ["click", "keypress"].forEach(ev=>{
        btn.addEventListener(ev, function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            this.classList.toggle('active');
            let anyOpen = document.querySelectorAll('#toolbar ul.open');
            if (anyOpen){
              anyOpen.forEach(function(el){
                el.classList.remove('open');
              });
            }
            document.getElementById(target).classList.toggle('open');
          }
          if (ev == 'click'){
            this.classList.toggle('active');
            let anyOpen = document.querySelectorAll('#toolbar ul.open');
            if (anyOpen){
              anyOpen.forEach(function(el){
                el.classList.remove('open');
              });
            }
            document.getElementById(target).classList.toggle('open');
          }
        });
      });
    });
  


  
    // All Close
    document.addEventListener('click', function(e){
      let exclude = ['button', 'a', 'button > span', '.modal-content *'];
      let excludeClose = ['toolbar','offcanvas-menu','homework'];
      if (!e.target.matches(exclude)) {
        let openElements = document.querySelectorAll('.open');
        openElements.forEach(function(el){
          if (excludeClose.indexOf(el.id) == -1){
            el.classList.toggle('open');
            document.querySelector('.modal-body').innerHTML = '';
          } 
        });
      }
    });

  } // btnEvents()

  // Modal Close
  // function modalClose(){
  //   let modalCloseButton = document.querySelectorAll('.modal-close');
  //   modalCloseButton.forEach(function(btn){
  //     ["click", "keypress"].forEach(ev=>{
  //       btn.addEventListener(ev, function(e){
  //         //e.preventDefault();
  //         if (e.keyCode === 13) {
  //           document.getElementById('modal_readerview').classList.toggle('open');
  //           document.querySelector('.modal-body').innerHTML = '';
  //           document.querySelector('#toolbar a:first-of-type, #toolbar button:first-of-type').focus();
  //         }
  //         if (ev == 'click'){
  //           document.getElementById('modal_readerview').classList.toggle('open');
  //           document.querySelector('.modal-body').innerHTML = '';
  //         }
  //       });
  //     });
  //   });
  // }
})();