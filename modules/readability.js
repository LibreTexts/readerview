
function readability_panel() {
   console.log("Hello there");
   document.getElementById('readability').innerHTML = `
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
   `;
}


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
      default: impl_Beeline_default();
   }
});

function impl_Beeline(theme) {
   var beelineElements = document.querySelectorAll("#beelineExamples");
   console.log(beelineElements);

   for (var i = 0; i < beelineElements.length; i++) {
      var beeline = new BeeLineReader(beelineElements[i], { theme: theme });
      beeline.color();
   }
}

function impl_Beeline_default() {
   var beelineElements = document.querySelectorAll("#beelineExamples");
   console.log(beelineElements)
   for (var i = 0; i < beelineElements.length; i++) {
      var beeline = new BeeLineReader(beelineElements[i], { theme: "off" });
      beeline.uncolor();
   }
};



export { readability_panel };