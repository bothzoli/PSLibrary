const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'PSLibrary' }));

require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  {
    title: 'Books',
    link: '/books'
  },
  {
    title: 'Authors',
    link: '/authors'
  }
];

const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')(nav);
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library',
    nav
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
