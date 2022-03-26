// Links
let myLinks = []
let linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
let linksWrapper = document.getElementById('links-wrapper')
const savedLinks = document.getElementById('saved-links')
let saveInput = document.getElementById('save-link')
let textLink = document.querySelectorAll('.text-link')
let linkInput = document.getElementById('link-input')
let linkForm = document.getElementById('link-form')


// Common
let outerWrap = document.getElementById('outer-wrapper')
let contentWrap = document.getElementById('content-wrapper')
let listEl = document.querySelectorAll('.list-el')
let clearStorage = document.getElementById('clearStorage')

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

if (linksFromLocalStorage) {
    myNotes = linksFromLocalStorage
    renderLinks()
  }

linkForm.addEventListener("submit", function(event) {
    event.preventDefault();
    }
  )

saveInput.addEventListener("click", function() {
    if (linkInput.value === "") {
      alert('You need to write something')
      return
    } else {
    myLinks.unshift(linkInput.value)
    localStorage.setItem("myLinks", JSON.stringify(myLinks) )
    renderLinks()
    linkInput.value = ""
  }
  })
  
function renderLinks() {
    linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") );
    myLinks = linksFromLocalStorage;
    listOfLinks = "";
    for (let i = 0; i < myLinks.length; i++) {
      listOfLinks += `
      <div class="link-box">
      <img src="https://s2.googleusercontent.com/s2/favicons?domain=${myLinks[i]} class="favicon"><a href="${myLinks[i]}" target="_blank" class="link">
      ${myLinks[i]}</a>
      <div class="link-delete"></div>
      </div>
    `
    }
    savedLinks.innerHTML = listOfLinks
    linkDelete()
  }

  function linkDelete() {
    let linkDelete = document.getElementsByClassName('link-delete')
    for (let i = linkDelete.length - 1; i >= 0; i--) {
        linkDelete[i].addEventListener("click", function() {
        this.parentNode.remove();
        removeLink(i)
        renderLinks()
    })
  }}

  function removeLink(e) {
    myLinks.splice(e, 1);
    localStorage.setItem("myLinks", JSON.stringify(myLinks) )
  }