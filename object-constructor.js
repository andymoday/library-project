function Book(title, author, pages, read) {
    this.name = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return (title + ' is a book by ' + author + ', ' + pages + ' pages, ' + read);
    }
}