import express from 'express';
import npmovieModel from './npmovieModel';


const router = express.Router();

router.get('/', (req, res, next) => {
  npmovieModel.find().then(npmovies => res.status(200).send(npmovies)).catch(next);
});



export default router;