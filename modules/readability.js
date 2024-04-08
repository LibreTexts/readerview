
function readability_panel() {
  
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
   <label class="fontSize_label">Text Color</label>

   <div class="text_color">
   <div class="button-container">
   <button class="bee_readability" id="sb_bright" style="margin: 6px; border: 2px solid white;background-image: linear-gradient(90deg, #0000F4, #000000, #E93323);
   color: #ffffff ; width: 50px; height:50px;"></button>
   <div class="label">Bright</div>
   </div>

   <div class="button-container">
   <button class="bee_readability" id="sb_blues" style="margin: 6px; border: 2px solid white;background-image: linear-gradient(90deg, #0000f1, #000000, #891bd5);
   color: #ffffff;width: 50px; height:50px;"></button>
   <div class="label">Blues</div>
   </div>

   <div class="button-container">
   <button class="bee_readability" id="sb_gray" style="margin: 6px; border: 2px solid white; background-image: linear-gradient(90deg, #7d7d7d, #000000, #7d7d7d);
   color: #ffffff;width: 50px; height:50px;"></button>
   <div class="label">Gray</div>
   </div>

   <div class="button-container">
   <button class="bee_readability" id="sb_inverted" style="margin: 6px; border: 2px solid white; background-image: linear-gradient(90deg, #56aaff, #ffffff, #9e8dfc);
   color: #383838;width: 50px; height:50px;"></button>
   <div class="label">Inverted & dark</div>
   </div>

   <div class="button-container">
   <button class="bee_readability" id="sb_off" style="margin: 6px; border: 2px solid white; width: 50px; height:50px;"></button>
   <div class="label">Off</div>
   </div>
   
    </div>
    </div>

   <div>
   <label class="fontSize_label">Text Size</label>
    <div class="font-adjuster">
    <button class="btn_plus" id="btn_inc" tabindex="0" aria-label="Increase">+</button>
    <button class=" btn_minus" id="btn_dsc" tabindex="0" aria-label="Increase">-</button>
    <div type ="input" class="range_base" id="range_bs" value="18"></div>
  </div>
   </div>
    
   <div>
   <label class="fontSize_label">Margin Size</label>
    <div class="margin-adjuster">
        <button class="btn_plus" id="btn_inc_margin" tabindex="0" aria-label="Increase Margin Size">+</button>
        <button class="btn_minus" id="btn_dec_margin" tabindex="0" aria-label="Decrease Margin Size">-</button>
        <div type ="input" class="margin_display" id="margin_disp" value="55"></div>
    </div>
</div>

   <label class="fontSize_label">Text type</label>
   <div class="dyslexic-toggle">
   Enable Dyslexic Font 
   <label class="switch">
  <input type="checkbox" id="dyslexic-checkbox">
  <span class="slider round"></span>
  </label>
   </div>
   
   
   `;
}



// Dyslexic Font
document.addEventListener("click", function(e){
   if(e.target && e.target.id=="dyslexic-checkbox"){
      var checkbox= document.getElementById('dyslexic-checkbox');
      
      if (checkbox.checked){
         change_font("OpenDyslexic");
         localStorage.setItem("DyslexicFont", true);
        }
        else{
         change_font("inherit");
         localStorage.setItem("DyslexicFont", false);
       }
      }
      
   });

function change_font(font){
   console.log("The font should be ", font);
   // var eg_cont= document.getElementById("beelineExamples");
   var elm = document.querySelectorAll("#elm-main-content");
      // eg_cont.style.fontFamily=font;
            for (var i = 0; i < elm.length; i++) {
               elm[i].style.fontFamily=font;
            }
}


//FONT SIZE

document.addEventListener("click", function(e) {
   if (e.target && (e.target.id == "btn_inc" || e.target.id == "btn_dsc")) {

      var val = document.getElementById("range_bs");
       var currentFontSize = parseInt(val.getAttribute("value"), 10);
       var newFontSize = e.target.id == "btn_inc" ? currentFontSize + 3 : currentFontSize - 3;
       
       localStorage.setItem("FontSize",newFontSize);

      //  val.setAttribute("value", newFontSize);
      //  val.textContent = newFontSize + "%";
       font_size(newFontSize);
       
   }
});
function font_size(newFontSize){
   var val = document.getElementById("range_bs");
   var main_cont = document.querySelectorAll("#elm-main-content");
   var main_cont2 = document.querySelectorAll('.readerView section.mt-content-container p');
   var title= document.querySelectorAll('.readerView h1#title');
   var h2=document.querySelectorAll('.readerView h2');

   for (var i = 0; i < main_cont.length; i++) {
       main_cont[i].style.fontSize = newFontSize + "px";
   }

   for (var i = 0; i < main_cont2.length; i++) {
       main_cont2[i].style.fontSize = newFontSize + "px";
   }
   for(var i=0; i<title.length; i++){
      title[i].style.fontSize= parseInt(newFontSize,10)*2 - 3 + "px";
   }

   for(var i=0; i<h2.length; i++){
      h2[i].style.fontSize= parseInt(newFontSize,10) + 4 + "px" + " !important";
   }
   val.setAttribute("value", newFontSize);
   val.textContent = newFontSize + "%";
}

//MARGIN SIZE
document.addEventListener("click", function(e){
   if(e.target && (e.target.id == "btn_inc_margin" || e.target.id == "btn_dec_margin")){
      var val=document.getElementById("margin_disp");   
      var currMarginSize = parseInt(val.getAttribute("value"), 10);

      var sizes=[
         {name: "Normal", value:55},
         {name: "Large", value:70},
         {name: "Extra Large", value:85},
         {name: "Full", value:100},
      ];

      var currIndex= sizes.findIndex(size=> size.value== currMarginSize);
       
      if(e.target.id == "btn_inc_margin" && currIndex < sizes.length-1){
         currIndex++;
      }
      else if(e.target.id == "btn_dec_margin" && currIndex > 0){
         currIndex--;
      }
      
      localStorage.setItem("MarginSize", sizes[currIndex].value)
      margin_size(sizes[currIndex].value);

   }
});

function margin_size(new_margin_size){
   var val=document.getElementById("margin_disp"); 
   var sizes=[
      {name: "Normal", value:55},
      {name: "Large", value:70},
      {name: "Extra Large", value:85},
      {name: "Full", value:100},
   ];

   var content=document.getElementById("elm-main-content");
   content.style.maxWidth=new_margin_size +"%";
   var sizeObject = sizes.find(size => size.value == new_margin_size)

   val.setAttribute("value",sizeObject.value);
   val.textContent=sizeObject.name;

}





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
   // var contentContainer= document.querySelector(".elm-skin-container");
   var maincont= document.querySelector('main');
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

   if (theme === 'night_blues') {
      console.log("yo");
      maincont.classList.add("darkMode");
      localStorage.setItem('darkMode', true);
   }
   else {
      maincont.classList.remove("darkMode");
      localStorage.setItem('darkMode', false);
   }

}

function impl_Beeline_default() {
   var beelineElements = document.querySelectorAll("#elm-main-content");
   var beeline_header = document.querySelectorAll("#readerview-container");

   var maincont= document.querySelector('main');
   console.log(beelineElements)
   for (var i = 0; i < beelineElements.length; i++) {
      var beeline = new BeeLineReader(beelineElements[i], { theme: "off" });
      beeline.uncolor();
   }
   for (var i = 0; i < beeline_header.length; i++) {
      var beeline = new BeeLineReader(beeline_header[i], { theme: "off" });
      beeline.uncolor();
   }
   localStorage.removeItem('selectedTheme');
   if (maincont.classList.contains("darkMode")){
      maincont.classList.remove("darkMode");
   }
   localStorage.setItem('darkMode', false);

};





export { readability_panel, close_panel,change_font, font_size,margin_size};