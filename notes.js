// Notes
let myNotes = []
let notesFromLocalStorage = JSON.parse( localStorage.getItem("myNotes") )
let noteWrapper = document.getElementById('note-wrapper')
const savedNotes = document.getElementById('saved-notes')
let saveInput = document.getElementById('save-note')
let textNote = document.querySelectorAll('.text-note')
let noteInput = document.getElementById('note-input')
let noteForm = document.getElementById('note-form')

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

if (notesFromLocalStorage) {
    myNotes = notesFromLocalStorage
    renderNotes()
  }

noteForm.addEventListener("submit", function(event) {
    event.preventDefault();
    }
  )

saveInput.addEventListener("click", function() {
    if (noteInput.value === "") {
      alert('You need to write something')
      return
    } else {
    myNotes.unshift(noteInput.value)
    localStorage.setItem("myNotes", JSON.stringify(myNotes) )
    renderNotes()
    noteInput.value = ""
  }
  })
  
function renderNotes() {
    notesFromLocalStorage = JSON.parse( localStorage.getItem("myNotes") );
    myNotes = notesFromLocalStorage;
    listOfNotes = "";
    for (let i = 0; i < myNotes.length; i++) {
      listOfNotes += `
      <div class="note-box">
      <p class="text-note">${myNotes[i]}</p>
      <div class="note-delete"></div>
      </div>
    `
    }
    savedNotes.innerHTML = listOfNotes
    noteCopy()
    noteDelete()
  }

  function noteCopy() {
    let currentNote = document.getElementsByClassName('text-note')
    for (let i = 0; i < currentNote.length; i++) {
      currentNote[i].addEventListener("click", () => {
            let textCopy = currentNote[i].innerText
            navigator.clipboard.writeText(textCopy);
           })
      }
  }

  function noteDelete() {
    let noteDelete = document.getElementsByClassName('note-delete')
    for (let i = noteDelete.length - 1; i >= 0; i--) {
      noteDelete[i].addEventListener("click", function() {
        this.parentNode.remove();
        removeNote(i)
        renderNotes()
    })
  }}

  function removeNote(e) {
    myNotes.splice(e, 1);
    localStorage.setItem("myNotes", JSON.stringify(myNotes) )
  }