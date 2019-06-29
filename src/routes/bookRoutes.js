const express = require('express');
const bookController = require('./../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('./../services/goodreadsService');

function router(nav) {
  const { userAuthorization, getBooks, getBookById } = bookController(bookService, nav);

  bookRouter.use(userAuthorization);

  bookRouter.route('/')
    .get(getBooks);

  bookRouter.route('/:id')
    .get(getBookById);

  return bookRouter;
}

module.exports = router;
