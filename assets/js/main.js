// Some code could be here ...
// const code = require('./prism.js')

// Calculate if color is dark or light
function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];
  }
  else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }
  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
  );
  // Using the HSP value, determine whether the color is light or dark
  if (hsp>127.5) {
    return 'light';
  }
  else {
    return 'dark';
  }
}

// Change alpha of RGBA (x,x,x, HERE) from querySelect
HTMLElement.prototype.alpha = function(a) {
  current_color = getComputedStyle(this).getPropertyValue("background-color");
  match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(current_color)
  a = a > 1 ? (a / 100) : a;
  this.style.backgroundColor = "rgba(" + [match[1],match[2],match[3],a].join(',') +")";
}

// Transform simpleicon to match Dark/Light Themes
function transformSimpleIcon(){
  let q = (selector, id) => {
    return document.querySelectorAll(selector)[id]
  }

  for(let [i, b] of document.querySelectorAll("div.box-tech-stack").entries()) {
    if(document.body.classList.contains("dark-theme")) {
      b.alpha(0.2)
      if(lightOrDark(b.querySelector(".simpleicons").style.color) == "dark") {
        b.querySelector(".simpleicons").style.color = "white";
      }
    } else {
      b.style.color = b.dataset.color;
      b.style.backgroundColor = b.dataset.bgcolor;
      b.querySelector(".simpleicons").style.color = b.dataset.color;
    }
  }
}

// Gist SelectBox
// const selected = document.querySelector(".selected");
// const optionsContainer = document.querySelector(".options-container");
//
// const optionsList = document.querySelectorAll(".option");
//
// selected.addEventListener("click", () => {
//   optionsContainer.classList.toggle("active");
// });
//
// optionsList.forEach(o => {
//   o.addEventListener("click", () => {
//     selected.innerHTML = o.querySelector("label").innerHTML;
//     optionsContainer.classList.remove("active");
//   });
// });
