const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(bookId) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=foT0srjExA6tLGm5fubQ`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(`Getting book ${result.GoodreadsResponse.book.title}`);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          debug(err);
          reject(err);
        });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
