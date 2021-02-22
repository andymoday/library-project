

function Book(title, author, pages, read) {
    this.name = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


Book.prototype.info = function() {
    return(this.name + ' is a book by ' + this.author + ', ' + this.pages + ' pages, ' + this.read);
}
//==============================================================================

function Book(title, author, pages, read) {
    this.name = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(this.name + ' is a book by ' + this.author + ', ' + this.pages + ' pages, ' + this.read);}
}
  
  const lolita = new Book('Lolita', 'Nabakov',333,'read')
  const theremin = new Book('Theremin','Glinsky', 500, 'read')
  console.log(lolita.info()) 
  console.log(theremin.info()) 