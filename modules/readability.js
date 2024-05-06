
// Dyslexic Font
document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "dyslexic-checkbox") {
    var checkbox = document.getElementById('dyslexic-checkbox');

    if (checkbox.checked) {
      change_font("OpenDyslexic");
      localStorage.setItem("DyslexicFont", true);
    }
    else {
      change_font("inherit");
      localStorage.setItem("DyslexicFont", false);
    }
  }

});

function change_font(font) {
  console.log("The font should be ", font);
  // var eg_cont= document.getElementById("beelineExamples");
  var elm = document.querySelectorAll("#elm-main-content");
  // eg_cont.style.fontFamily=font;
  for (var i = 0; i < elm.length; i++) {
    elm[i].style.fontFamily = font;
  }
}


//FONT SIZE

// document.addEventListener("click", function(e) {
//    if (e.target && (e.target.id == "btn_inc" || e.target.id == "btn_dsc")) {

//       var val = document.getElementById("range_bs");
//        var currentFontSize = parseInt(val.getAttribute("value"), 10);
//        var newFontSize = e.target.id == "btn_inc" ? currentFontSize + 3 : currentFontSize - 3;

//        localStorage.setItem("FontSize",newFontSize);

//       //  val.setAttribute("value", newFontSize);
//       //  val.textContent = newFontSize + "%";
//        font_size(newFontSize);

//    }
//    else if (e.target.id=="text_size_reset"){
//       localStorage.setItem("FontSize",18);
//       font_size(18);
//    }
// });
function font_size(newFontSize) {
  var val = document.getElementById("range_bs");
  var font_Sizes = [
    { name: "Extra Small", value: 12 },
    { name: "Small", value: 15 },
    { name: "Normal", value: 18 },
    { name: "Large", value: 20 },
    { name: "Full", value: 22 },
  ];
  var main_cont = document.querySelectorAll("#elm-main-content");
  var main_cont2 = document.querySelectorAll('.readerView section.mt-content-container p');
  var title = document.querySelectorAll('.readerView h1#title');
  var h2 = document.querySelectorAll('.readerView h2');

  for (var i = 0; i < main_cont.length; i++) {
    main_cont[i].style.fontSize = newFontSize + "px";
  }

  for (var i = 0; i < main_cont2.length; i++) {
    main_cont2[i].style.fontSize = newFontSize + "px";
  }
  for (var i = 0; i < title.length; i++) {
    title[i].style.fontSize = parseInt(newFontSize, 10) * 2 - 3 + "px";
  }

  for (var i = 0; i < h2.length; i++) {
    h2[i].style.fontSize = parseInt(newFontSize, 10) + 4 + "px" + " !important";
  }

  var sizeObject = font_Sizes.find(size => size.value == newFontSize)
  val.setAttribute("value", sizeObject.value);
  val.textContent = sizeObject.name;
  // val.setAttribute("value", newFontSize);
  // val.textContent = newFontSize + "%";
}

//UPDTATED FONT SIZE
document.addEventListener("click", function (e) {
  if (e.target && (e.target.id == "btn_inc" || e.target.id == "btn_dsc")) {
    var val = document.getElementById("range_bs");
    var currentFontSize = parseInt(val.getAttribute("value"), 10);

    var font_Sizes = [
      { name: "Extra Small", value: 12 },
      { name: "Small", value: 15 },
      { name: "Normal", value: 18 },
      { name: "Large", value: 20 },
      { name: "Full", value: 22 },
    ];
    var currIndex = font_Sizes.findIndex(size => size.value == currentFontSize);
    if (e.target.id == "btn_inc" && currIndex < font_Sizes.length - 1) {
      currIndex++;
    }
    else if (e.target.id == "btn_dsc" && currIndex > 0) {
      currIndex--;
    }

    localStorage.setItem("FontSize", font_Sizes[currIndex].value);
    font_size(font_Sizes[currIndex].value)
  }
  else if (e.target.id == "text_size_reset") {
    localStorage.setItem("FontSize", 18);
    font_size(18);
  }
});


//MARGIN SIZE
document.addEventListener("click", function (e) {
  if (e.target && (e.target.id == "btn_inc_margin" || e.target.id == "btn_dec_margin")) {
    var val = document.getElementById("margin_disp");
    var currMarginSize = parseInt(val.getAttribute("value"), 10);

    var sizes = [
      { name: "Normal", value: 55 },
      { name: "Large", value: 70 },
      { name: "Extra Large", value: 85 },
      { name: "Full", value: 100 },
    ];

    var currIndex = sizes.findIndex(size => size.value == currMarginSize);

    if (e.target.id == "btn_inc_margin" && currIndex < sizes.length - 1) {
      currIndex++;
    }
    else if (e.target.id == "btn_dec_margin" && currIndex > 0) {
      currIndex--;
    }

    localStorage.setItem("MarginSize", sizes[currIndex].value)
    margin_size(sizes[currIndex].value);

  }
  else if (e.target.id == "margin_size_reset") {
    localStorage.setItem("MarginSize", 55)
    margin_size(55);
  }
});

function margin_size(new_margin_size) {
  var val = document.getElementById("margin_disp");
  var sizes = [
    { name: "Normal", value: 55 },
    { name: "Large", value: 70 },
    { name: "Extra Large", value: 85 },
    { name: "Full", value: 100 },
  ];

  var content = document.getElementById("elm-main-content");
  content.style.maxWidth = new_margin_size + "%";
  var sizeObject = sizes.find(size => size.value == new_margin_size)

  val.setAttribute("value", sizeObject.value);
  val.textContent = sizeObject.name;
}

//CLOSE BUTTON
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "chevron-icon") {
    close_panel();
  }

});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    close_panel();
  }
});
function close_panel() {
  var ReadabilityElement = document.getElementById('readability');
  var aria = document.getElementById('readability_btn');
  aria.setAttribute('aria-expanded', 'false');
  ReadabilityElement.setAttribute("class", "");
}

document.addEventListener("DOMContentLoaded", function () {
  var selectedTheme = localStorage.getItem('selectedTheme');
  if (selectedTheme) {
    impl_Beeline(selectedTheme);
  }
});


let beeline_btns = document.querySelectorAll('.bee-readability');
beeline_btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    switch (btn.id) {
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
      case 'text_color_reset': impl_Beeline_default();
    }
  });
});



function impl_Beeline(theme) {
  var beelineElements = document.querySelectorAll("#elm-main-content");
  var beeline_header = document.querySelectorAll("#readerview-container");
  // var contentContainer= document.querySelector(".elm-skin-container");
  var maincont = document.querySelector('main');

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

  var maincont = document.querySelector('main');
  for (var i = 0; i < beelineElements.length; i++) {
    var beeline = new BeeLineReader(beelineElements[i], { theme: "off" });
    beeline.uncolor();
  }
  for (var i = 0; i < beeline_header.length; i++) {
    var beeline = new BeeLineReader(beeline_header[i], { theme: "off" });
    beeline.uncolor();
  }
  localStorage.removeItem('selectedTheme');
  if (maincont.classList.contains("darkMode")) {
    maincont.classList.remove("darkMode");
  }
  localStorage.setItem('darkMode', false);

};





export { close_panel, change_font, font_size, margin_size };