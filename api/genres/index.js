import express from 'express';

import genreModel from './genreModel';
const router = express.Router();



router.get('/', (req, res, next) => {
    genreModel.find().then(genres => res.status(200).send(genres)).catch(next);
  });

export default router;