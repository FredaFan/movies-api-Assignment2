# Assignment 2 - Agile Software Practice.

Name: Jiayu Fan

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.

+ Get /api/movies/:id - returns detailed information on a specific movie.

+ Put /api/movies/:id - update a specific movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.

+ Post /api/movies - add a new movie with with correct title and id to movie arrays.

+ Delete /api/movies - delete a movie from an array of movie objects.

+ Get /api/users -return an array of users.

+ Post /api/users - add a new user with usename and validated password to the database. 

+ Put /api/users/:id - update a specific user. The request payload includes the some/all of the following user properties to be updated: user id, password.

+ Post /api/users/:username/favourites - add a movie to user's favourites by sending invalid movie id but each movie can be added once or it will send error. 

+ Get /api/users/:username/favourites - add a movie to user's favourites by sending invalid movie id but each movie can be added once or it will send error. 

+ Get /api/people - returns an array of popular actors.

+ Get /api/people/:id - returns detailed information on a specific person.

+ Get /api/upcoming - returns an array of upcoming movie objects.

  

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movies - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 
+ Get/api/movies - test when try to get movies  without prior authentication. See tests/functional/api/movies/index.js 
+ Get/api/movies/: id - test when try to access to a movie with an invaild id, that's to say input a movie id that is not corresct. See tests/functional/api/movies/index.js 
+ Get/api/movies/: id/reviews - test when try to get selected movies reviews with an invalid movie id. See tests/functional/api/movies/index.js 
+ Post /api/users - test when register a new user with the invalidated password. See tests/functional/api/users/index.js 
+ Post /api/users/favourites - test when add an invalid movie id into user's favourites. See tests/functional/api/users/index.js 
+ Post /api/users/favourites - test when add the same movie id twice in user's favourites. See tests/functional/api/users/index.js 

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://dashboard.heroku.com/apps/movies-api-staging-jiayufan - Staging deployment
+ https://dashboard.heroku.com/apps/movies-api-assignment2-fjy - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![截屏2021-01-14 下午4.10.38](https://tva1.sinaimg.cn/large/008eGmZEgy1gmnph8dof5j31c00u0aq1.jpg)[stagingapp]

+ Production app overview 



![Production App](https://tva1.sinaimg.cn/large/008eGmZEgy1gmnr955s0mj31c00u0wuh.jpg)

[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.





# Assignment 2 - Web API.

Name: Jiayu Fan

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,

 + Feature 1 - Users can add a movie into their favourite list and can also delete them
 + Feature 2 - Set users a flag attribute that's to say users can also add a movie to their flag list
 + Feature 3 - Add genres api which can return the genres of movies
 + Feature 4 - Add upcoming movies api
 + Feature 5 - Add popular people api
 + Feature 6 - Add top rated movies api
 + Feature 7 - Add now playing movies api

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

The react app github URL is 

```bat
https://github.com/FredaFan/movies-api-Assignment2-React
```

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=mongodb+srv://admin:admin123@cluster0.8hkci.mongodb.net/test?retryWrites=true&w=majority
TMDB_KEY=0c77793c5b12c423b54bd5b30b88f9b0
seedDb=true
SECRET=ilikecake
```


## API Design

Give an overview of your web API design, perhaps similar to the following: 

GET

/api/movies |Get a list of movies

/api/movies/{movieid} | Get a Movie

/api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie 

/api/users |Gets a list of users | 

/api/users/username/favourites |Gets a detailed information of user's favourite movie | 

/api/users/username/flags |Gets a detailed information of user's flag movie | 

/api/people |Gets a list of popular actors | 

/api/people/{peopleid} | Get a selected people with detailed information

/api/upcoming |Get a list of upcoming movies

/api/genres |Get a list of genres of movies

/api/top |Get a list of top rated movies

/api/nowplaying |Get a list of now playing movies



POST

/api/movies |Add a new movie with id and title

/api/users |Register a new user

/api/uses/{username}/favourites |Add a movie into users favourites list

/api/uses/{username}/flags |Add a movie into users flag list



DELETE

/api/uses/{username}/flags |Delete a movie from users flag list with correct ID



If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).


## Security and Authentication

Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

![passport](https://tva1.sinaimg.cn/large/008eGmZEgy1gmqwe4bju0j312k08on1j.jpg)



![PrivateRoute](https://tva1.sinaimg.cn/large/008eGmZEgy1gmqwjmhyuaj311g0mk112.jpg)



## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => {return json.results;});
};

~~~





~~~Javascript
export const getUpcomingMovies = () => {
  return fetch(
    '/api/upcoming',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

~~~

## 



~~~Javascript
export const getTopRatedMovies = () => {
  return fetch(
    '/api/top',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

~~~



~~~Javascript
export const getNowPlayingMovies = () => {
  return fetch(
    '/api/nowplaying',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

~~~



~~~Javascript
export const getPopularPerson = () => {
  return fetch(
    '/api/people',{headers: {
      'Authorization': window.localStorage.getItem('token')
   }
 }
 ).then(res => res.json());
};

~~~



## Extra features

In order to have access to the private router, users must log in first or just sign up a new username.

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  