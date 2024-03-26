import ClipboardJS from 'clipboard';
import MicroModal from 'micromodal';
import ls from 'localstorage-slim';
import { Page, getPageObj } from './modules/pageinfo.js';
import { buildCite } from './modules/cite.js';
import { renderHelp } from './modules/help.js';
import { initDownloadButtons } from './modules/downloads.js';
import { initHomeworkButton } from './modules/homework.js';
import { initFeedbackButton } from './modules/feedback.js';
import { initPopButtons } from './modules/popelement.js';
import { renderTableOfContents } from './modules/contents.js';
import { renderHeaderTitle } from './modules/headertitle.js';
import { performSearch, setSearchLinkParent } from './modules/search.js';
import { initResourceLinks } from './modules/resources.js';
import { initToolsLinks } from './modules/tools.js';
import { readability_panel, close_panel,change_font, font_size } from './modules/readability.js';


(function () {
  
  if (window.location.href.includes('readerView') || window.location.href.includes('readerView')) {
    
    // add the readerView class to the body element (used in readerView.css)
    document.body.classList.add('readerView');
    var parent= document.getElementById('readerview_container')
    var readabilityDiv = document.createElement("div");
    readabilityDiv.id = "readability";
    readabilityDiv.className="";
    parent.appendChild(readabilityDiv);
    
    // var readSubDiv = document.createElement("div");
    // readSubDiv.setAttribute("mt-section-origin", "Template:Custom/Views/Header/Header_Panel");
    // readSubDiv.className = "mt-section";
    // readabilityDiv.appendChild(readSubDiv);


    window.addEventListener('load', async function () {
      // add logic meant for readerView Only    

      appendPageLinks();

      async function getLTObject() {
        return LibreTexts.getTOC();
      }

      getLTObject().then(function(result){
        let bookID = LibreTexts.current.coverpage.id;
        
        if (!(ls.get(bookID))) {
          ls.set(bookID, LibreTexts.current, { ttl: 3600 });
        }

        renderHeaderTitle(bookID);
        renderTableOfContents(bookID);
        performSearch(bookID);
        initResourceLinks(bookID);
        initToolsLinks(bookID);
        initPopButtons();
 
      });

    });
    window.addEventListener('libre-downloadsinfoavailable', initDownloadButtons);
    window.addEventListener('libre-commonsinfoavailable', () => {
      initHomeworkButton();
      initFeedbackButton();
    });

    getPageObj();
    
    //MicroModal.init();
    closeWithEsc();
    btnEvents();
    

    // make all .copy-button copy to clipboard from 
    // data-clipboard-target
    const clip = new ClipboardJS('.copy-button');
    clip.on('success', (e) => {
      e.trigger.innerHTML = 'Copied!';
      setTimeout(function() {
        e.trigger.innerHTML = 'Copy Text';
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
      console.log("I am printing modal buttons");
      console.log(title)
    console.log(modalBodyMethod);  
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
     
    // READABILITY OPTION 
    var toolbarMenu = document.getElementById('toolbar_menu');
    var ReadabilityToolbarItem = document.createElement('li');

    var get_font_size= localStorage.getItem("FontSize");
    if (get_font_size==null){
      localStorage.setItem("FontSize",18);
    }
    else{
      localStorage.setItem("FontSize",get_font_size);
    }

      ReadabilityToolbarItem.className = 'toolbar-item';  
      ReadabilityToolbarItem.id = 'Readability-menu-item'; 

      toolbarMenu.appendChild(ReadabilityToolbarItem);
      
      var sub_readability = document.createElement('button');

      // var isExpanded = sub_readability.getAttribute('aria-expanded') === 'true';
      sub_readability.setAttribute('aria-expanded', "false");      
      sub_readability.className="toolbar-btn";
      

      sub_readability.id="readability_btn";
      // sub_readability.href="https://dev.libretexts.org/?tools?readerView";
      sub_readability.rel="internal";
      sub_readability.setAttribute("data-target","readability");
      sub_readability.setAttribute("data_type","collapse");
      
      ReadabilityToolbarItem.appendChild(sub_readability);
       
      var content = document.createElement('span');
      content.textContent= "Readability";

      sub_readability.appendChild(content);

      ReadabilityToolbarItem.onclick = toggleReadability;
    
      // sub_readability.addEventListener('click', readability_panel);


    function toggleReadability(){ 
      var ReadabilityElement = document.getElementById('readability');
      console.log(ReadabilityElement.getAttribute("class"));
 
      var isExpanded = sub_readability.getAttribute('aria-expanded') === 'true';
      sub_readability.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      console.log(isExpanded);
      if (!isExpanded) {
        console.log(ReadabilityElement);
        ReadabilityElement.setAttribute("class","op");
        readability_panel();
        font_size(localStorage.getItem("FontSize"));
        restoreDyslexicFontState();
        // setTimeout(restoreDyslexicFontState, 0);
        close_search_panel();

    } 

    else {
      console.log(ReadabilityElement);
        ReadabilityElement.setAttribute("class","");
        setTimeout(restoreDyslexicFontState, 0);

    }
    
    }
    
    document.addEventListener('DOMContentLoaded', function() {
     
      readability_panel();
      
    });

    document.addEventListener("DOMContentLoaded", function(){
       var get_font_size= localStorage.getItem("FontSize")
      font_size(get_font_size);
    });

    document.addEventListener("DOMContentLoaded", function() {
      var selected_font = localStorage.getItem('DyslexicFont');

    if (selected_font == "true") {
      restoreDyslexicFontState();
      change_font("OpenDyslexic");
    } else {
      restoreDyslexicFontState();
      change_font("inherit");
    }
  });

  function restoreDyslexicFontState() {
    var checkbox = document.getElementById('dyslexic-checkbox');
    var selected_font = localStorage.getItem('DyslexicFont');

    if (selected_font == "true") {
      checkbox.checked = true;
      change_font("OpenDyslexic");
    } else {
      checkbox.checked = false;
      change_font("inherit");
    }
}


    document.getElementById('toogle_search').addEventListener('click', function() {
      setTimeout(() => {
        const searchDiv = document.getElementById('search');
        if (this.getAttribute('aria-expanded') === 'true' && searchDiv.classList.contains('open')) {
          close_panel();
        }
      }, 0); 
    });    
    
    // document.getElementById('readability_btn').addEventListener('click', function() {
    //   setTimeout(() => {
    //     const read_div = document.getElementById('readability');
    //     if (this.getAttribute('aria-expanded') === 'true' && read_div.classList.contains('op')) {
    //       close_search_panel();
    //     }
    //   }, 0); 
    // });    

    function close_search_panel(){
     var search_elm= document.getElementById('toogle_search');
      const searchDiv = document.getElementById('search');
      search_elm.setAttribute('aria-expanded','false');
      search_elm.classList.remove('active');
      searchDiv.classList.remove('open');
      search_elm.focus();
    }
     
     // Div Collapse
    let collapseButtons = document.querySelectorAll('[data-type="collapse"]');
    collapseButtons.forEach(function(btn){
      let target = btn.getAttribute('data-target');
      let target_element = document.getElementById(target);
      ["click", "keypress"].forEach(ev=>{
        btn.addEventListener(ev, function(e){
          e.preventDefault();
          let icon = btn.querySelector('.material-symbols-outlined');
          let expanded = this.getAttribute('aria-expanded');
          if (expanded === 'false') {
            this.setAttribute('aria-expanded', 'true')
          } else {
            this.setAttribute('aria-expanded', 'false')
          }
          if (e.keyCode === 13) {
            this.classList.toggle('active');
            target_element.classList.toggle('open');
            target_element.querySelector('a:first-of-type, button:first-of-type, input:first-of-type').focus();
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
          if (btn.id === 'toggle_ocm' && btn.classList.contains('active')) {
            icon.innerHTML = 'close';
          } else if ( btn.id === 'toggle_ocm' && !(btn.classList.contains('active')) ) {
            icon.innerHTML = 'menu';
          }
        });
      });
    });



    // Dropdown Menus
    // let dropdownButtons = document.querySelectorAll('[data-type="dropdown"]');
    // dropdownButtons.forEach(function(btn){
    //   let target = btn.getAttribute('data-target');
    //   let target_element = document.getElementById(target);

    //   ["click", "keypress"].forEach(ev=>{
    //     btn.addEventListener(ev, function(e){
    //       e.preventDefault();
    //       if (e.keyCode === 13) {
    //         this.classList.toggle('active');
    //         let alreadyOpen = target_element.classList.contains('open');
    //         let anyOpen = document.querySelectorAll('#toolbar ul.open');
    //         if (anyOpen){
    //           anyOpen.forEach(function(el){
    //             el.classList.remove('open');
    //           });
    //         }
    //         target_element.classList.toggle('open', alreadyOpen === false);
    //       }
    //       if (ev == 'click'){
    //         this.classList.toggle('active');
    //         let alreadyOpen = target_element.classList.contains('open');
    //         let anyOpen = document.querySelectorAll('#toolbar ul.open');
    //         if (anyOpen){
    //           anyOpen.forEach(function(el){
    //             el.classList.remove('open');
    //           });
    //         }
    //         target_element.classList.toggle('open', alreadyOpen === false); 
    //       }
    //     });
    //   });
    // });
  


  
    // All Close
    document.addEventListener('click', function(e){
      //let exclude = ['button.has-submenu', 'a', 'button.has-submenu > span', '.modal-content *'];
      let exclude = ['button.has-submenu', 'button.has-submenu>*', '.modal-content *'];
      let excludeClose = ['toolbar','offcanvas-menu','homework','search'];
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