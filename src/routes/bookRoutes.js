const express = require('express');
const debug = require('debug')('app:bookRoutes');

const mongo = require('./../util/mongo');


const bookRouter = express.Router();

function router(nav) {
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      debug('User not logged in, redirecting');
      res.redirect('/');
    }
  });

  bookRouter.route('/')
    .get((req, res) => {
      debug('Getting books');

      (async function getBooks() {
        const books = await mongo.getBooks();

        res.render('bookListView', {
          title: 'Library',
          nav,
          books
        });
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      debug('Getting a book');

      const { id } = req.params;

      (async function getBook() {
        const book = await mongo.getBook(id);

        res.render('bookView', {
          title: 'Library',
          nav,
          book
        });
      }());
    });

  return bookRouter;
}

module.exports = router;
