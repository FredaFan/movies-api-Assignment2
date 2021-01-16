import express from 'express';
import trmovieModel from './trmovieModel';


const router = express.Router();

router.get('/', (req, res, next) => {
  trmovieModel.find().then(trmovies => res.status(200).send(trmovies)).catch(next);
});



export default router;