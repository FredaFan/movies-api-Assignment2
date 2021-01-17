import express from 'express';
import movieModel from './movieModel';

import {
  getMovies, getMovie, getMovieReviews, getMovieSimilar, getMovieRecommendations
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

router.get('/:id/similar', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(500).json({ code: 500, msg: 'It is an invaild movie id.' });
  const id = parseInt(req.params.id);
  const movies = await getMovieSimilar(id);
  if (movies == "") return res.status(404).json({ code: 404, msg: 'There is no similar movies of this movie' });
  res.status(200).json(movies);
});

router.get('/:id/recommendations', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(500).json({ code: 500, msg: 'It is an invaild movie id.' });
  const id = parseInt(req.params.id);
  const movies = await getMovieRecommendations(id);
  if (movies == "") return res.status(404).json({ code: 404, msg: 'There is no recommendations movies of this movie' });
  res.status(200).json(movies);
});



export default router;