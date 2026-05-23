const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const indexRouter = require('./routes/index');
const reservationRouter = require('./routes/reservation');

const app = express();
const PORT = process.env.PORT || 3000;

// ── View Engine: Handlebars ──
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    year: () => new Date().getFullYear(),
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ── Middleware ──
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ──
app.use('/', indexRouter);
app.use('/reservation', reservationRouter);

// ── 404 Handler ──
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found | Spice Mandal' });
});

// ── Error Handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Server Error | Spice Mandal', message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🍛 Spice Mandal server running at http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
