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

    getPageObj();
    initPopButtons();
    MicroModal.init();
    closeWithEsc();
    
    /**
     * ToDo:
     * - find out why current.coverpage is not available on window.load
     */
    renderHeaderTitle();
    btnEvents();

    // make all .copy-button copy to clipboard from 
    // data-clipboard-target
    const clip = new ClipboardJS('.copy-button');
    clip.on('success', (e) => {
      e.trigger.innerHTML = 'Copied!';
      setTimeout(function() {
        e.trigger.innerHTML = 'Copy to clipboard';
      }, 4000);
    });
  }
  
  window.addEventListener('load', function() {
    // add logic for both readerView and Default
    tippy('[data-tippy-content]');
 
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


  function closeWithEsc() {
    // To Do: wire this up with data-controlled-by or something to ensure the aria-* settings, etc are managed properly with Esc closing.
    let exitablePanels = ['#offcanvas-menu', '.toolbar-btn'];
    exitablePanels.forEach(function(panel){
      document.querySelector(panel).addEventListener('keydown', function(e){
        if(e.key === "Escape") {
          console.log(e);
          e.preventDefault();
          this.classList.remove('open');
        }
      });
    });
  }


  function btnEvents() {
    // Handles events for all layout buttons

    let exitBtn = document.getElementById('exit_reader');
    ["click", "keypress"].forEach(ev=>{
      exitBtn.addEventListener(ev, function(e){
        e.preventDefault();
        if (e.keyCode === 13 || ev == 'click') {
          window.open(window.location.origin + window.location.pathname, '_self');
        }
      })
    });

    // Modals
    let modalButtons = document.querySelectorAll('[data-type="modal"]');
    modalButtons.forEach(function(btn){
      let title = btn.getAttribute('data-modal-title');
      let modalBodyMethod = btn.getAttribute('data-modal-src');

      ["click", "keypress"].forEach(ev=>{
        btn.addEventListener(ev, function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            MicroModal.show('modal-main');
            document.getElementById('modal-main-title').innerHTML = title;
          }
          if (ev == 'click') {
            MicroModal.show('modal-main');
            document.getElementById('modal-main-title').innerHTML = title;
          }
          switch (modalBodyMethod) {
            case 'cite':
              document.getElementById('modal-main-body').innerHTML = buildCite(Page);
              break;
            
            case 'help':
              document.getElementById('modal-main-body').innerHTML = renderHelp();
                break;
            
            case 'na':
              let modalBody = btn.getAttribute('data-modal-body');
              document.getElementById('modal-main-body').innerHTML = `<p>${modalBody}</p>`;
          
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
          let expanded = this.getAttribute('aria-expanded');
          if (expanded === 'false') {
            this.setAttribute('aria-expanded', 'true')
          } else {
            this.setAttribute('aria-expanded', 'false')
          }
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
      let target_element = document.getElementById(target);

      ["click", "keypress"].forEach(ev=>{
        btn.addEventListener(ev, function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            this.classList.toggle('active');
            let alreadyOpen = target_element.classList.contains('open');
            let anyOpen = document.querySelectorAll('#toolbar ul.open');
            if (anyOpen){
              anyOpen.forEach(function(el){
                el.classList.remove('open');
              });
            }
            target_element.classList.toggle('open', alreadyOpen === false);
          }
          if (ev == 'click'){
            this.classList.toggle('active');
            let alreadyOpen = target_element.classList.contains('open');
            console.log(alreadyOpen);
            let anyOpen = document.querySelectorAll('#toolbar ul.open');
            if (anyOpen){
              anyOpen.forEach(function(el){
                el.classList.remove('open');
              });
            }
            target_element.classList.toggle('open', alreadyOpen === false); 
          }
        });
      });
    });
  


  
    // All Close
    document.addEventListener('click', function(e){
      //let exclude = ['button.has-submenu', 'a', 'button.has-submenu > span', '.modal-content *'];
      let exclude = ['button.has-submenu', 'button.has-submenu>*', '.modal-content *'];
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