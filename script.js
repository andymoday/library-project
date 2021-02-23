let myLibrary = []

function Book(title, author, pages, read) {
    this.name = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title, author, pages, read))
  }

Book.prototype.bookDisplay = function() {
    return(this.name + ', \n' + this.author + ', \n' + this.pages + ' pages \n');
}

addBookToLibrary('Lolita','Nabakov',123,'read')
addBookToLibrary('LOTR','Tolkein',1234,'unread')
addBookToLibrary('Lucky Jim','Kingsley Amis',293,'read')

const library = document.getElementById('library');
let bookContainer =[];
let readButton=[];
for (i = 0; i < myLibrary.length; i++) {
    bookContainer[i] = document.createElement('div');
    bookContainer[i].setAttribute('class', 'book');
    bookContainer[i].textContent = myLibrary[i].bookDisplay();
    library.appendChild(bookContainer[i]);
    readButton[i] = document.createElement('button');
    readButton[i].setAttribute('class', 'read-button');
    readButton[i].setAttribute('id', `${i}`);
    readButton[i].textContent = myLibrary[i].read;
    bookContainer[i].appendChild(readButton[i]);
    readButton[i].setAttribute('onclick','changeRead('+`${i}`+')');
}

document.getElementById('form').onsubmit = function() { 
    let title_input = document.getElementById('title').value;
    let author_input = document.getElementById('author').value;
    let pages_input = document.getElementById('pages').value;
    let read_input = (document.getElementById('read').checked === true) ? 'read' : 'unread';
    addBookToLibrary(title_input,author_input,pages_input,read_input);
    let bookIndex = myLibrary.length-1; 
    bookContainer[bookIndex] = document.createElement('div');
    bookContainer[bookIndex].setAttribute('class', 'book');
    bookContainer[bookIndex].textContent = myLibrary[myLibrary.length-1].bookDisplay();
    readButton[bookIndex] = document.createElement('button');
    readButton[bookIndex].setAttribute('class', 'read-button');
    readButton[bookIndex].setAttribute('id', `${bookIndex}`);
    readButton[bookIndex].textContent = myLibrary[bookIndex].read;
    bookContainer[bookIndex].appendChild(readButton[bookIndex]);
    readButton[bookIndex].setAttribute('onclick','changeRead('+`${bookIndex}`+')');
    library.appendChild(bookContainer[bookIndex]);
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('pages').value = ''
    document.getElementById('read').value = ''
    return false;//It's important to return false; to prevent default behaviour at the end of your submit handler, as otherwise the form will post and reload the page.
};

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
  } 

function changeRead(i) {
    let changeButton = document.getElementById(i);
    console.log(changeButton)
    if(myLibrary[i].read === 'read') {
        changeButton.textContent = 'unread'
        myLibrary[i].read = 'unread'
    } else {
        changeButton.textContent = 'read'
        myLibrary[i].read = 'read'
    }
}