import express from 'express';
import movieModel from './movieModel';

import {
  getMovies, getMovie, getMovieReviews
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews))
  .catch((error) => next(error));
});


router.post('/', async (req, res, next) => {
  let newMovie = req.body;
  if (newMovie && newMovie.title) {
    !newMovie.id ? newMovie.id = Math.round(Math.random() * 10000) : newMovie;
    await movieModel.create(newMovie).catch(next);
    res.status(201).send(newMovie);
  } else {
    return res.status(401).json({ code: 401, msg: 'You should input the movie title.' 
    });
  }
});




export default router;