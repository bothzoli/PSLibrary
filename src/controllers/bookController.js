const debug = require('debug')('app:bookController');

const mongo = require('./../util/mongo');

function bookController(bookService, nav) {
  function userAuthorization(req, res, next) {
    next();
    // Commenting out for testing purposes
    // if (req.user) {
    //   next();
    // } else {
    //   debug('User not logged in, redirecting');
    //   res.redirect('/');
    // }
  }

  function getBooks(req, res) {
    debug('Getting books');

    (async function getBooksFromDB() {
      const books = await mongo.getBooks();

      res.render('bookListView', {
        title: 'Library',
        nav,
        books
      });
    }());
  }

  function getBookById(req, res) {
    debug('Getting a book');

    const { id } = req.params;

    (async function getBook() {
      const book = await mongo.getBook(id);

      book.details = await bookService.getBookById(book.bookId);
      res.render('bookView', {
        title: 'Library',
        nav,
        book
      });
    }());
  }

  return {
    userAuthorization,
    getBooks,
    getBookById
  };
}

module.exports = bookController;
