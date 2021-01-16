import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import genreModel from '../api/genres/genreModel';
import personModel from '../api/people/personModel';
import ucmovieModel from '../api/upcomingMovies/ucmovieModel';
import trmovieModel from '../api/topRatedMovies/trmovieModel';
import npmovieModel from '../api/nowplayingMovies/npmovieModel';
import {movies} from './movies.js';
import {genres} from './genres';
import {people} from './people';
import {ucmovies} from './ucmovies';
import {trmovies} from './trmovies';
import {npmovies} from './npmovies';
const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

  export async function loadMovies() {
    console.log('load seed data');
    console.log(movies.length);
    try {
      await movieModel.deleteMany();
      await movieModel.collection.insertMany(movies);
      console.info(`${movies.length} Movies were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load movie Data: ${err}`);
    }
  }

  export async function loadGenres() {
    console.log('load genre data');
    
    try {
      await genreModel.deleteMany();
      await genreModel.collection.insertMany(genres);
      console.info(`${genres.length} Genres were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load genres Data: ${err}`);
    }
  }

  export async function loadPeople() {
    console.log('load person data');
    
    try {
      await personModel.deleteMany();
      await personModel.collection.insertMany(people);
      console.info(`${people.length} People were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load people Data: ${err}`);
    }
  }

  export async function loadUcmovies() {
    console.log('load upcoming movies data');
    
    try {
      await ucmovieModel.deleteMany();
      await ucmovieModel.collection.insertMany(ucmovies);
      console.info(`${ucmovies.length} Upcoming movies were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load upcoming movies Data: ${err}`);
    }
  }

  export async function loadTrmovies() {
    console.log('load top rated movies data');
    
    try {
      await trmovieModel.deleteMany();
      await trmovieModel.collection.insertMany(trmovies);
      console.info(`${trmovies.length} Top rated movies were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load top rated movies Data: ${err}`);
    }
  }

  export async function loadNpmovies() {
    console.log('load nowplaying movies data');
    
    try {
      await npmovieModel.deleteMany();
      await npmovieModel.collection.insertMany(npmovies);
      console.info(`${npmovies.length} Now playing movies were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load now playing movies Data: ${err}`);
    }
  }