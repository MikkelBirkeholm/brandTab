let fontName = ''
let listEl = document.querySelectorAll('.list-el')
const colorList = document.getElementById('color-list')
let colorBoxes = ''
let savedColors = document.querySelectorAll('.colorbox')
const addColorBtn = document.getElementById('add-color')
const testBtn = document.getElementById('test-btn')
const clearBtn = document.getElementById('clear-btn')
const storage = chrome.storage.sync




/* --- This is just some chrome storage testing :) ---- */

function saveColor(id, value) {
  this.id = id;
  this.value = value;
}

// storage.set({color: '#fff'}, function() {
// });

testBtn.addEventListener('click', function(){
  storage.get(['color'], function(result){
    alert(result.color)
  });
  })

clearBtn.addEventListener('click', function(){
  storage.clear()
})



/* --- This is just some chrome storage testing end ---- */

const fontTemplate = `
  <li class="saved-font hover-effect">
    <span>${fontName}</span><img src="duplicate-icon.svg" alt="" width="25" class="copy-icon">
  </li>
`
function liTemplate(bgColor) { 
  return `
  <li class="list-el">
    <div id="delete-btn" class="delete-btn"></div>
    <div class="colorbox hover-effect" style="background-color:${bgColor}" value="${bgColor}">
    </div>
  </li>
`
}


/* --- CONTEXT MENU, don't mind this yet ----  */

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});


 /* --- CONTEXT MENU END----  */


addColorBtn.addEventListener("click", function() {
  let colorList = document.getElementById('color-list')
  const eyeDropper = new EyeDropper()

  eyeDropper.open().then(result => {
    colorValue = result.sRGBHex
    colorList.insertAdjacentHTML('beforeend', liTemplate(colorValue));

    let currentColor = document.getElementsByClassName('colorbox')
    addDelete()
    storage.set({})
    

    for (let i = 0; i < currentColor.length; i++) {
      currentColor[i].id = 'idColor' + [i+1];
      currentColor[i].addEventListener("click", () => {
          let elementCopy = currentColor[i].getAttribute('value')
          navigator.clipboard.writeText(elementCopy);
         })
    }
  })
    .catch(e => {
      alert('Something went wrong or the action was cancelled')
    })
})


function addDelete() {
  let deleteBtn = document.getElementsByClassName('delete-btn')
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", function() {
        this.parentNode.remove();
      })
}}


function addFont() {
    let fontList = document.getElementById('font-list')
    fontList.innerHTML = fontList.innerHTML + fontTemplate
}

