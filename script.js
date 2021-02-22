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
    return(this.name + ', \n' + this.author + ', \n' + this.pages + ' pages \n' + 'Read?' + this.read);
}

addBookToLibrary('Lolita','Nabakov',123,'yes')
addBookToLibrary('LOTR','Tolkein',1234,'no')
addBookToLibrary('Lucky Jim','Kingsley Amis',293,'yes')

const library = document.getElementById('library');
let bookContainer =[];
for (i = 0; i < myLibrary.length; i++) {
    bookContainer[i] = document.createElement('div');
    bookContainer[i].setAttribute('class', 'book');
    bookContainer[i].textContent = myLibrary[i].bookDisplay();
    library.appendChild(bookContainer[i]);
}
document.getElementById('form').onsubmit = function() { 
    let title_input = document.getElementById('title').value;
    let author_input = document.getElementById('author').value;
    let pages_input = document.getElementById('pages').value;
    let read_input = document.getElementById('read').value;
    addBookToLibrary(title_input,author_input,pages_input,read_input);
    let bookIndex = myLibrary.length-1; 
    bookContainer[bookIndex] = document.createElement('div');
    bookContainer[bookIndex].setAttribute('class', 'book');
    bookContainer[bookIndex].textContent = myLibrary[myLibrary.length-1]['name'];
    library.appendChild(bookContainer[bookIndex]);
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('pages').value = ''
    document.getElementById('read').value = ''
    return false;//It's important to return false; to prevent default behaviour at the end of your submit handler, as otherwise the form will post and reload the page.
};

