import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import dotenv from 'dotenv';

dotenv.config();
const expect = chai.expect;

let db;
let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";

const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];
const sampleUser = {
  "favourites": [],
  "flags": [],
  "_id": "5ffe500faf39630b28ca8f60",
  "username": "user1",
  "password": "$2a$10$52hddYMYKK1VOfR17QWSL.UpVH2T6Wsu.vFjft5/FP/R7M.v2wsv6",
  "__v": 1
};

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .set("Authorization", "BEARER" + token)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    
  describe("POST /:users", () => {
    it("should return a 200 status and the confirmation message", () => {
        request(api)
        .post("/api/users")  
        .set("Accept", "application/json")   
        .set("Authorization", "BEARER" + token)   
        .send({
          username: "user3",
          password: "test3",
        })       
        .expect(200)
        
    });
    after(() => {
        request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .set("Authorization", "BEARER" + token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(3);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2", "user3"]);
        });
    });
  });
  describe("POST / :favorites", () => {
    it("should return a 200 status and the confirmation message", () => {
      request(api)
      .post(`/api/users/${sampleUser.username}/favourites`)
      .set("Accept", "application/json")   
      .set("Authorization", "BEARER" + token)   
      .send({
        "id": 590706
        
      })       
      .expect(200)
      
  });
  after(() => {
      request(api)
      .get(`/api/users/${sampleUser.username}/favourites`)
      .set("Accept", "application/json")
      .set("Authorization", "BEARER" + token)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        
      });
  });

  });
});
});
