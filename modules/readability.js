
function readability_panel() {
   console.log("Hello there");
   document.getElementById('readability').innerHTML = `
   <head>
    <!-- Add icon library -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   </head>
   <button id="chevron-icon">x</button>
   <img title="Beeline Logo" src="https://test.libretexts.org/hagnew/development/public/Binh%20Nguyen/ReactSidebar/src/assets/beeline_logo_combo_master-cropped.svg" style="margin: 0px 5vw;">
   <p id="beelineExamples"> BeeLine Reader uses subtle color gradients to help you read more quickly and efficiently. Choose a color scheme below, or <a href="http://www.beelinereader.com/education/?utm_source=libretexts" style="color: rgb(48, 179, 246); display: unset; margin: 0px;">click here to learn more. </a></p>
   
   <div id="doBeelines">
   <button class="bee_readability" id="sb_bright" style="margin: 6px; border: 2px solid white;background-image: linear-gradient(90deg, #0000F4, #000000, #E93323);
   color: #ffffff">BRIGHT</button>
   <button class="bee_readability" id="sb_blues" style="margin: 6px; border: 2px solid white;background-image: linear-gradient(90deg, #0000f1, #000000, #891bd5);
   color: #ffffff;">BLUES</button>
   <button class="bee_readability" id="sb_gray" style="margin: 6px; border: 2px solid white; background-image: linear-gradient(90deg, #7d7d7d, #000000, #7d7d7d);
   color: #ffffff;">GRAY</button>
   <button class="bee_readability" id="sb_inverted" style="margin: 6px; border: 2px solid white; background-image: linear-gradient(90deg, #56aaff, #ffffff, #9e8dfc);
   color: #383838;">Inverted + Dark Mode</button>
   <button class="bee_readability" id="sb_off" style="margin: 6px; border: 2px solid white;">OFF</button>
    </div>
   <div>
   <label class="fontSize_label">Text Size Adjustment</label>

    <div class="font-adjuster">
    <button class="btn_plus" id="btn_inc" tabindex="0" aria-label="Increase"><i class="fa fa-plus" style="font-size:15px; margin-left: 28px; margin-top: -2px " ></i></button>
    <button class=" btn_minus" id="btn_dsc" tabindex="0" aria-label="Increase"><i class="fa fa-minus" style="font-size:15px; margin-left: 28px; margin-top: -2px"></i></button>
    <div type ="input" class="range_base" id="range_bs" value="18">18%</div>
  </div>

   </div>
   <div class="dyslexic-toggle">
   Enable Dyslexic Font 
   <label class="switch">
  <input type="checkbox" id="dyslexic-checkbox">
  <span class="slider round"></span>
  </label>
   </div>
   
   
   `;
}



//Dyslexic Font
document.addEventListener("click", function(e){
   if(e.target && e.target.id=="dyslexic-checkbox"){
      var checkbox= document.getElementById('dyslexic-checkbox');
      // var eg_cont= document.getElementById("beelineExamples");
      // var elm = document.querySelectorAll("#elm-main-content");
      if (checkbox.checked){
            // eg_cont.style.fontFamily="OpenDyslexic";
            // for (var i = 0; i < elm.length; i++) {
            //    elm[i].style.fontFamily="OpenDyslexic";
            // }
         change_font("OpenDyslexic");
         localStorage.setItem("DyslexicFont", true);
        }
        else{
         // eg_cont.style.fontFamily="inherit";
         // for (var i = 0; i < elm.length; i++) {
         //    elm[i].style.fontFamily="inherit";
         // }
         change_font("inherit");
         localStorage.setItem("DyslexicFont", false);
       }
      }
      
   });

function change_font(font){
   console.log("The font should be ", font);
   var eg_cont= document.getElementById("beelineExamples");
   var elm = document.querySelectorAll("#elm-main-content");
      eg_cont.style.fontFamily=font;
            for (var i = 0; i < elm.length; i++) {
               elm[i].style.fontFamily=font;
            }
}

// // Dyslexic Font
// document.addEventListener("DOMContentLoaded", function() {
   
//    var selectedFont= localStorage.getItem('DyslexicFont');
//    if(selectedFont=="true"){
//       change_font("OpenDyslexic");
//    } 
//    else{
//       change_font("inherit");
//    }

  
// });



// THE ONE WHICH I have commented recently



// document.addEventListener("DOMContentLoaded", function() {
//    // Read the dyslexic font setting from localStorage
//    var selectedFont = localStorage.getItem('DyslexicFont');
   
//    // Ensure the checkbox is correctly checked or unchecked based on localStorage
//    var dyslexicCheckbox = document.getElementById('dyslexic-checkbox');
//    if (selectedFont === "true") {
//       dyslexicCheckbox.checked = true;
//       applyDyslexicFont(true);
//    } else {
//       dyslexicCheckbox.checked = false;
//       applyDyslexicFont(false);
//    }
// });

// function applyDyslexicFont(enabled) {
//    // Define the font to apply based on the 'enabled' parameter
//    var font = enabled ? "OpenDyslexic" : "inherit";
//    // Apply the font to elements
//    var eg_cont = document.getElementById("beelineExamples");
//    var elms = document.querySelectorAll("#elm-main-content");
//    if (eg_cont) eg_cont.style.fontFamily = font;
//    elms.forEach(elm => {
//       elm.style.fontFamily = font;
//    });
// }

// // Listen for changes to the dyslexic font checkbox
// document.addEventListener("click", function(e) {
//    if (e.target && e.target.id === "dyslexic-checkbox") {
//       var isEnabled = e.target.checked;
//       localStorage.setItem("DyslexicFont", isEnabled); // Store the setting as a string
//       applyDyslexicFont(isEnabled);
//    }
// });



//Text Size
// document.addEventListener("click", function(e){
//    if (e.target && e.target.id === "slider") {
//       changeSizeBySlider();
//     }
     
// })
// function changeSizeBySlider(){
   
//    var main_cont=document.querySelectorAll("#elm-main-content");
//    var eg_cont= document.getElementById("beelineExamples");

//    var sld = document.getElementById("slider");
//    console.log(main_cont);

//    for (var i = 0; i < main_cont.length; i++) {
//       main_cont[i].style.fontSize=sld.value + "px";
//    }
//    // main_cont.style.fontSize=sld.value + "px";
//    eg_cont.style.fontSize=sld.value + "px";
// }



document.addEventListener("click", function(e){
     if(e.target && e.target.id == "btn_inc"){
        var eg_cont= document.getElementById("beelineExamples");
        var main_cont=document.querySelectorAll("#elm-main-content");

        var val= document.getElementById("range_bs");
        var value_inc= parseInt(val.getAttribute("value"),10)+3;
        val.setAttribute("value",value_inc);

        for (var i = 0; i < main_cont.length; i++) {
         main_cont[i].style.fontSize=value_inc + "px";
      }
      //   eg_cont.style.fontSize=value_inc + "px";
        val.textContent = value_inc+"%";
     }
});

document.addEventListener("click", function(e){
   if(e.target && e.target.id == "btn_dsc"){
      var eg_cont= document.getElementById("beelineExamples");
      var main_cont=document.querySelectorAll("#elm-main-content");

      var val= document.getElementById("range_bs");
      var value_dsc= parseInt(val.getAttribute("value"),10)-3;
      val.setAttribute("value",value_dsc);

      for (var i = 0; i < main_cont.length; i++) {
         main_cont[i].style.fontSize=value_dsc + "px";
      }
      // eg_cont.style.fontSize=value_dsc + "px";
      val.textContent = value_dsc+"%";
   }
});




//CLOSE BUTTON
document.addEventListener("click", function(e){
   if (e.target && e.target.id === "chevron-icon") {
      close_panel();
    }
     
});

document.addEventListener("keydown", function(e){
   if (e.key === "Escape") {
     close_panel();
   }
});
function close_panel(){
   var ReadabilityElement = document.getElementById('readability');
   var aria = document.getElementById('readability_btn');
   console.log(aria);
   aria.setAttribute('aria-expanded','false');
   ReadabilityElement.setAttribute("class","");
}

document.addEventListener("DOMContentLoaded", function() {
   var selectedTheme = localStorage.getItem('selectedTheme');
   if (selectedTheme) {
      impl_Beeline(selectedTheme);
   }
});

document.addEventListener("click", function (e) {
   switch (e.target && e.target.id) {
      case 'sb_bright':
         console.log("Bright");
         impl_Beeline('bright');
         break;
      case 'sb_blues':
         console.log("Blues");
         impl_Beeline('blues');
         break;
      case 'sb_gray':
         console.log("Gray");
         impl_Beeline('gray');
         break;
      case 'sb_inverted':
         console.log("Inverted + Dark Mode");
         impl_Beeline('night_blues');
         break;
      case 'sb_off': impl_Beeline_default();
   }
});


function impl_Beeline(theme) {
   var beelineElements = document.querySelectorAll("#elm-main-content");
   var beeline_header = document.querySelectorAll("#readerview-container");
   var contentContainer= document.querySelectorAll(".elm-skin-container");
   console.log(beelineElements);

   for (var i = 0; i < beelineElements.length; i++) {
      var beeline = new BeeLineReader(beelineElements[i], { theme: theme });
      beeline.color();
   }
   for (var i = 0; i < beeline_header.length; i++) {
      var beeline = new BeeLineReader(beeline_header[i], { theme: theme });
      beeline.color();
   }
   localStorage.setItem('selectedTheme', theme);

   // if (theme === 'night_blues') {
   //    contentContainer.addClass('darkMode');
   //    localStorage.setItem('darkMode', true);
   // }
   // else {
   //    contentContainer.removeClass('darkMode');
   //    localStorage.setItem('darkMode', false);
   // }

}

function impl_Beeline_default() {
   var beelineElements = document.querySelectorAll("#elm-main-content");
   console.log(beelineElements)
   for (var i = 0; i < beelineElements.length; i++) {
      var beeline = new BeeLineReader(beelineElements[i], { theme: "off" });
      beeline.uncolor();
   }
   localStorage.removeItem('selectedTheme');

};





export { readability_panel, close_panel };