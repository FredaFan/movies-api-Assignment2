import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';
const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', (req, res ,next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});


// register

// authenticate a user
router.post('/', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({
      success: false,
      msg: 'Please pass username and password.',
    });
  }
  if (req.query.action === 'register') {
    var validation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    var result = validation.test(req.body.password);
    if(result){
      await User.create(req.body).catch(next);    
      res.status(201).json({
        code: 201,
        msg: 'Successful created new user.',
      });
    }
    else {
      res.status(401).json({
        code: 401,
        msg: 'Registration and invalidation failed. Wrong password.'
      });
    }
    
  } else {
    const user = await User.findByUserName(req.body.username).catch(next);
      if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.username, process.env.SECRET);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
          });
        } else {
          res.status(401).json({
            code: 401,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
});
// Update a user
router.put('/:id',  (req, res ,next) => {
    if (req.body._id) delete req.body._id;
     User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    })
    .then(user => res.json(200, user)).catch(next);
});
//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', async (req, res, next) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite);
  
  const user = await User.findByUserName(userName).catch(next);
  if (!user) return res.status(401).json({ code: 401, msg: 'User not found.' });
  if (user.favourites.indexOf(movie._id)===-1){
    await user.favourites.push(movie._id);
  await user.save(); 
  res.status(201).json(user); 
  
  }else{
    return res.status(401).json({ code: 401, msg: 'The favourites movie has existed in.' });
  }
  
  

  
});

router.post('/:userName/flags', async (req, res, next) => {
  const newFlag = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFlag);
  
  const user = await User.findByUserName(userName).catch(next);
  if (!user) return res.status(401).json({ code: 401, msg: 'User not found.' });
  if (user.flags.indexOf(movie._id)===-1){
    await user.flags.push(movie._id);
  await user.save(); 
  res.status(201).json(user); 
  
  }else{
    return res.status(401).json({ code: 401, msg: 'The flag movie has existed in.' });
  }
  
  

  
});

router.delete('/:userName/flags/:id',  async (req, res, next) => {
  const key =  parseInt(req.params.id);
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(key);
  
  const user = await User.findByUserName(userName).catch(next);



   if (user.flags.indexOf(movie._id) > -1) { 
    await movieModel.remove(movie).catch(next);
    res.status(200).send({message: `Deleted movie id: ${key}.`,status: 200});
} else {
  res.status(404).send({message: `Unable to find movie with id: ${key}.`, status: 404});
  }
});
  
  
router.get('/:userName/favourites', (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('favourites').then(
    user => res.status(201).json(user.favourites)
  ).catch(next);
});

router.get('/:userName/flags', (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('flags').then(
    user => res.status(201).json(user.flags)
  ).catch(next);
});


export default router;