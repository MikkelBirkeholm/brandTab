// Common
let outerWrap = document.getElementById('outer-wrapper')
let contentWrap = document.getElementById('content-wrapper')
let listEl = document.querySelectorAll('.list-el')
let clearStorage = document.getElementById('clearStorage')

// Colors
let colorBoxes = ''
let myColors = []
const addColorBtn = document.getElementById('add-color')
const savedColors = document.querySelectorAll('.colorbox')
let colorsFromLocalStorage = JSON.parse( localStorage.getItem("myColors") )
const colorList = document.getElementById('color-list')


/* ----------------------------------- */

// Menu Links
const linksBtn = document.getElementById('links')
const notePad = document.getElementById('notepad')
const mainView = document.getElementById('main-view')

linksBtn.addEventListener("click", function(){
    window.location.assign("/links.html")
  })
  
  mainView.addEventListener("click", function() {
    window.location.assign("/colors.html")
  })
  
  notePad.addEventListener("click", function() {
    window.location.assign("/notes.html")
  })

/* ------------------------------------------------- */

notePadTemplate = `
string text string text
`;

colorPads = `
<div id="color-wrapper">
<h3>Brand Colors</h3>
<span id="add-color" class="hover-effect"></span>
<ul id="color-list">
</ul>
</div>
`;


if (colorsFromLocalStorage) {
  myColors = colorsFromLocalStorage
  renderColors()
}


/* --- CONTEXT MENU, don't mind this yet ----  */

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

 /* --- CONTEXT MENU END----  */


addColorBtn.addEventListener("click", function() {
  body = document.body;
  outerWrap = document.getElementById('outer-wrapper')
  const eyeDropper = new EyeDropper()
  body.classList.add("hidden");
  outerWrap.classList.add("hidden");
  eyeDropper.open().then(result => {
    body.classList.remove("hidden");
    outerWrap.classList.remove("hidden");
    colorValue = result.sRGBHex
    myColors.push(colorValue)
    localStorage.setItem("myColors", JSON.stringify(myColors) )
    renderColors()
    addAni()
  }) .catch(e => {
    body.classList.remove("hidden");
    outerWrap.classList.remove("hidden");
    return
  })
})


function renderColors() {
  colorsFromLocalStorage = JSON.parse( localStorage.getItem("myColors") );
  myColors = colorsFromLocalStorage;
  listOfColors = "";
  for (let i = 0; i < myColors.length; i++) {
    listOfColors += `
      <li class="list-el">
        <div id="delete-btn" class="delete-btn"></div>
        <div class="colorbox hover-effect" style="background-color:${myColors[i]}" value="${myColors[i]}" title=${myColors[i]}>
        </div>
      </li>
  `
  }
  colorList.innerHTML = listOfColors
  addCopy()
  addDelete()
}

function addCopy() {
  let currentColor = document.getElementsByClassName('colorbox')
  for (let i = 0; i < currentColor.length; i++) {
      currentColor[i].id = 'idColor' + [i+1];
      currentColor[i].addEventListener("click", () => {
          let elementCopy = currentColor[i].getAttribute('value')
          navigator.clipboard.writeText(elementCopy);
         })
    }
}

function addDelete() {
  let deleteBtn = document.getElementsByClassName('delete-btn')
  for (let i = deleteBtn.length - 1; i >= 0; i--) {
      deleteBtn[i].addEventListener("click", function() {
        this.parentNode.remove();
        removeColor(i)
        renderColors()
      })
}}

function removeColor(e) {
    myColors.splice(e, 1);
    localStorage.setItem("myColors", JSON.stringify(myColors) )
}

function addAni() {
  let listEl = document.querySelectorAll('.list-el')
  for (let i = 0; i < listEl.length; i++) {
    lastItem = listEl.length - 1;
    listEl[lastItem].classList.add('spawnAni')
  }
}
