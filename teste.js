const Book = require('./models/Livro');

let book = new Book();
book.title = 'seila';
book.write = 'Jose Divino';
book.publicationDate = "19/12/2000"


let error = book.validateSync();
console.log(error);