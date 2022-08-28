import {Page, getPageObj} from './modules/pageinfo.js';
import {buildCite} from './modules/cite.js';
import { initDownloadButtons } from './modules/downloads.js';
import { initHomeworkButton } from './modules/homework.js';
import { initFeedbackButton } from './modules/feedback.js';

(function () {
  
  if (window !== window.top || window.location.href.includes('readerView') || window.location.href.includes('readerView')) {

    // add the readerView class to the body element (used in readerView.css)
    document.body.classList.add('readerView');
  
    window.addEventListener('load', function() {
      // add logic meant for readerView Only
      appendPageLinks();
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
    getBookInfo();
    btnEvents();
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

  function getBookInfo() {
    // get the base info for a book and sections

    document.querySelector('.header-title').innerHTML = '<span class="booktitle">' + Page.parentParentTitle + '</span>';
    if (Page.parentTitle){
      document.querySelector('.header-title').innerHTML += ' <span class="material-symbols-outlined">keyboard_double_arrow_right</span> ' +  Page.parentTitle;
      document.querySelector('span.booktitle').style.color = 'darkslategray';
    }
  }

  function btnEvents() {
    // Handles events for all layout buttons

    // Modals
    let modalButtons = document.querySelectorAll('[data-type="modal"]');
    modalButtons.forEach(function(btn){
      let target = btn.getAttribute('data-target');
      let title = btn.getAttribute('data-modal-title');
      let target_element = document.getElementById(target);
      let modalBodyMethod = btn.getAttribute('data-modal-src');
      
      btn.addEventListener('click', function(e){
        document.getElementById(target).classList.toggle('open');
        console.log(target_element);
        target_element.querySelector('.modal-title').innerHTML = title;

        switch (modalBodyMethod) {
          case 'cite':
            target_element.querySelector('.modal-body').innerHTML = buildCite(Page);
            break;
        
          default:
            console.log("error");
            break;
        }
      });
    });

    // Div Collapse
    let collapseButtons = document.querySelectorAll('[data-type="collapse"]');
    collapseButtons.forEach(function(btn){
      let target = btn.getAttribute('data-target');
      btn.addEventListener('click', function(e){
        this.classList.toggle('active');
        document.getElementById(target).classList.toggle('open');
      });
    });

    // Dropdown Menus
    let dropdownButtons = document.querySelectorAll('[data-type="dropdown"]');
    dropdownButtons.forEach(function(btn){
      let target = btn.getAttribute('data-target');
      btn.addEventListener('click', function(e){
        this.classList.toggle('active');
        let anyOpen = document.querySelectorAll('#toolbar ul.open');
        if (anyOpen){
          anyOpen.forEach(function(el){
            el.classList.remove('open');
          })
        }
        document.getElementById(target).classList.toggle('open');
      });
    });
  
    // Modal Close
    document.querySelector('.modal-close').addEventListener('click', function(){
      document.querySelector('.modal').classList.toggle('open');
      document.querySelector('.modal-body').innerHTML = '';
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

  
})();