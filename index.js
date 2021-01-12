import session from 'express-session';
import passport from './authenticate';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import './db';
import {loadUsers, loadMovies, loadGenres,loadPeople, loadUcmovies} from './seedData';
import usersRouter from './api/users';
import genreRouter from './api/genres';
import personRouter from './api/people';
import ucmovieRouter from './api/upcomingMovies';
import loglevel from 'loglevel';
if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
 } else {
  loglevel.setLevel('info')
 }
if (process.env.SEED_DB === 'true' && process.env.NODE_ENV === 'development') {
  loadUsers();
  loadMovies();
  loadGenres();
  loadPeople();
  loadUcmovies();
}
dotenv.config();

const app = express();

const port = process.env.PORT;
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static('public'));
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);
app.use('/api/genres', genreRouter);
app.use('/api/people', personRouter);
app.use('/api/upcoming', ucmovieRouter);
app.use(errHandler);

let server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});


module.exports = server