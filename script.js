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
    return (`${this.name}\r\n${this.author}\r\n${this.pages} pages`);
}

//addBookToLibrary('Lolita','Nabakov',123,'READ')
//addBookToLibrary('LOTR','Tolkein',1234,'UNREAD')
//addBookToLibrary('Lucky Jim','Kingsley Amis',293,'READ')
//addBookToLibrary('Lolita','Nabakov',123,'READ')
//addBookToLibrary('LOTR','Tolkein',1234,'UNREAD')
//addBookToLibrary('Lucky Jim','Kingsley Amis',293,'READ')

let myLibrary = []
console.log(localStorage.getItem('myLibrary'))
if(localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
}
console.log(Object.getPrototypeOf(myLibrary[1]))
const library = document.getElementById('library');
let bookContainer =[];
let readButton=[];
let removeButton=[]
for (i = 0; i < myLibrary.length; i++) {
    bookContainer[i] = document.createElement('div');
    bookContainer[i].setAttribute('class', 'book');
    bookContainer[i].textContent = myLibrary[i].bookDisplay();
    library.appendChild(bookContainer[i]);
    
    readButton[i] = document.createElement('button');
    readButton[i].setAttribute('class', 'read-button');
    readButton[i].setAttribute('id', `read-${i}`);
    readButton[i].textContent = myLibrary[i].read;
    bookContainer[i].appendChild(readButton[i]);
    readButton[i].setAttribute('onclick','changeRead('+`${i}`+')');
    
    removeButton[i] = document.createElement('button');
    removeButton[i].setAttribute('class', 'remove-button');
    removeButton[i].setAttribute('id', `remove-${i}`);
    removeButton[i].textContent = 'DELETE';
    bookContainer[i].appendChild(removeButton[i]);
    removeButton[i].setAttribute('onclick','removeBook('+`${i}`+')');
}
document.getElementById('form').onsubmit = function() { 
    let title_input = document.getElementById('title').value;
    let author_input = document.getElementById('author').value;
    let pages_input = parseInt(document.getElementById('pages').value);
    if (typeof pages_input !== 'number') {
        alert('Please enter a number')
    } else {
        let read_input = (document.getElementById('read').checked === true) ? 'READ' : 'UNREAD';
        addBookToLibrary(title_input,author_input,pages_input,read_input);
        let bookIndex = myLibrary.length-1; 
        bookContainer[bookIndex] = document.createElement('div');
        bookContainer[bookIndex].setAttribute('class', 'book');
        bookContainer[bookIndex].textContent = myLibrary[myLibrary.length-1].bookDisplay();
        
        readButton[bookIndex] = document.createElement('button');
        readButton[bookIndex].setAttribute('class', 'read-button');
        readButton[bookIndex].setAttribute('id', `read-${bookIndex}`);
        readButton[bookIndex].textContent = myLibrary[bookIndex].read;
        bookContainer[bookIndex].appendChild(readButton[bookIndex]);
        readButton[bookIndex].setAttribute('onclick','changeRead('+`${bookIndex}`+')');
        
        removeButton[bookIndex] = document.createElement('button');
        removeButton[bookIndex].setAttribute('class', 'remove-button');
        removeButton[bookIndex].setAttribute('id', `remove-${bookIndex}`);
        removeButton[bookIndex].textContent = 'DELETE';
        bookContainer[bookIndex].appendChild(removeButton[bookIndex]);
        removeButton[bookIndex].setAttribute('onclick','removeBook('+`${bookIndex}`+')');
        library.appendChild(bookContainer[bookIndex]);
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('pages').value = ''
        document.getElementById('read').value = ''
        populateStorage();
        console.log(Object.getPrototypeOf(myLibrary[bookIndex]))
        return false;//It's important to return false; to prevent default behaviour at the end of your submit handler, as otherwise the form will post and reload the page.
    }
};
function populateStorage() {
        localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
}






function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
  } 

function changeRead(i) {
    let changeButton = document.getElementById(`read-${i}`);
    console.log(changeButton)
    if(myLibrary[i].read === 'READ') {
        changeButton.textContent = 'UNREAD'
        myLibrary[i].read = 'UNREAD'
    } else {
        changeButton.textContent = 'READ'
        myLibrary[i].read = 'READ'
    }
}
function removeBook(i) {
    library.removeChild(bookContainer[i]);
    delete myLibrary[i];
}