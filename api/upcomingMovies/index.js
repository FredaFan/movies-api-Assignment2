import express from 'express';
import ucmovieModel from './ucmovieModel';

import {
  getMovies, getMovie, getMovieReviews
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  ucmovieModel.find().then(ucmovies => res.status(200).send(ucmovies)).catch(next);
});



export default router;