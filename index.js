let fontName = ''
let listEl = document.querySelectorAll('.list-el')
const colorList = document.getElementById('color-list')
let colorBoxes = ''
let savedColors = document.querySelectorAll('.colorbox')
const addColorBtn = document.getElementById('add-color')


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


/* --- CONTEXT MENU ----  */

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});


 /* --- CONTEXT MENU END END END----  */


addColorBtn.addEventListener("click", function() {
  let colorList = document.getElementById('color-list')
  const eyeDropper = new EyeDropper()

  eyeDropper.open().then(result => {
    colorValue = result.sRGBHex // resultElement.textContent = result.sRGBHex;
    colorList.insertAdjacentHTML('beforeend', liTemplate(colorValue));
    let currentColor = document.getElementsByClassName('colorbox')
    addDelete()

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

