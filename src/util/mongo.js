const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:mongoDB');

const url = 'mongodb://localhost:27017';
const dbName = 'LibraryApp';


const insertBooks = async function insertBooks(books) {
  let client;
  let response;

  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    debug('Connected correctly to server');

    const db = client.db(dbName);

    debug('Inserting books into DB');
    response = await db.collection('books')
      .insertMany(books);
  } catch (err) {
    debug(err.stack);
  }

  client.close();
  return response;
};

const getBooks = async function getBooks() {
  let client;
  let books;

  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    debug('Connected correctly to server');

    const db = client.db(dbName);

    const col = await db.collection('books');

    debug('Getting books from DB');
    books = await col.find().toArray();
  } catch (err) {
    debug(err.stack);
  }

  client.close();
  return books;
};


const getBook = async function getBook(id) {
  let client;
  let book;

  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    debug('Connected correctly to server');

    const db = client.db(dbName);

    const col = await db.collection('books');

    debug(`Getting book with ID: ${id} from DB`);
    book = await col.findOne({
      _id: new ObjectID(id)
    });
  } catch (err) {
    debug(err.stack);
  }

  client.close();
  return book;
};

module.exports.insertBooks = insertBooks;
module.exports.getBooks = getBooks;
module.exports.getBook = getBook;
