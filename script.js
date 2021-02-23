//=======================SET UP BOOK OBJECT============================
function Book(title, author, pages, read) {
    this.name = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.bookDisplay = function() {
    return (`${this.name}\r\n${this.author}\r\n${this.pages} pages`);
}

//===========================FUNCTIONS======================================
//========================ADD NEW BOOK=====================================

function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title, author, pages, read))
  }

  //======ADDS CONTENTS OF ARRAY TO LOCAL STORAGE============================

  function populateStorage() {
    localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
}

//=================FORM OPEN AND CLOSE=============================

function openForm() {
document.getElementById("myForm").style.display = "block";
}
function closeForm() {
document.getElementById("myForm").style.display = "none";
} 

//=========================UPDATE READ BUTTON==============================

function changeRead(i) {
    let changeButton = document.getElementById(`read-${i}`);
    if(myLibrary[i].read === 'READ') {
        changeButton.textContent = 'UNREAD'
        myLibrary[i].read = 'UNREAD'
    } else {
        changeButton.textContent = 'READ'
        myLibrary[i].read = 'READ'
    }
}
//=========================REMOVE BOOK FROM DISPLAY AND MYLIBRARY===========

function removeBook(i) {
    library.removeChild(bookContainer[i]);
    myLibrary.splice(i,1);
    populateStorage();
}

function libraryUpdate(index) {
        bookContainer[index] = document.createElement('div');
        bookContainer[index].setAttribute('class', 'book');
        bookContainer[index].textContent = myLibrary[index].bookDisplay();
        library.appendChild(bookContainer[index]);
        
        readButton[index] = document.createElement('button');
        readButton[index].setAttribute('class', 'read-button');
        readButton[index].setAttribute('id', `read-${index}`);
        readButton[index].textContent = myLibrary[index].read;
        bookContainer[index].appendChild(readButton[index]);
        readButton[index].setAttribute('onclick','changeRead('+`${index}`+')');
        
        removeButton[index] = document.createElement('button');
        removeButton[index].setAttribute('class', 'remove-button');
        removeButton[index].setAttribute('id', `remove-${index}`);
        removeButton[index].textContent = 'DELETE';
        bookContainer[index].appendChild(removeButton[index]);
        removeButton[index].setAttribute('onclick','removeBook('+`${index}`+')');
        populateStorage();
}

//===========================CODE BODY============================================

let myLibrary = []
let bookContainer =[];
let readButton=[];
let removeButton=[];
const library = document.getElementById('library');


if(localStorage.getItem('myLibrary') !== null) {              //checks for local storage
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));//JSON parse for formatting (localStorage is string only)
    for (i = 0; i < myLibrary.length; i++) {
        myLibrary[i].__proto__ = new Book()                   //reinstates prototype which isn't preserved by localStorage
        libraryUpdate(i);  
    }
} 
document.getElementById('form').onsubmit = function() {        //form submission for new book
    let title_input = document.getElementById('title').value;
    let author_input = document.getElementById('author').value;
    let pages_input = parseInt(document.getElementById('pages').value);
    let read_input = (document.getElementById('read').checked === true) ? 'READ' : 'UNREAD';
    if (typeof pages_input !== 'number') {
        alert('Please enter a number')
    } else {
        
        addBookToLibrary(title_input,author_input,pages_input,read_input);

        let bookIndex = myLibrary.length-1; 
        libraryUpdate(bookIndex);
        
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('pages').value = ''
        document.getElementById('read').value = ''
        
        return false;//It's important to return false; to prevent default behaviour at the end of your submit handler, as otherwise the form will post and reload the page.
    }
};

