import chai from "chai";
import request from "supertest";
import dotenv from 'dotenv';
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";

const expect = chai.expect;
dotenv.config();
let db;
let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";
const sampleMovie = {
  id: 337401,
  title: "Mulan",
};
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
describe("Movies endpoint", () => {
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
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });


  describe("GET /movies ", () => {
    describe("when it was unauthorized", () => {
      it("should return errors", () => {
        return request(api)
          .get(`/api/movies`)
          .set("Accept", "application/json")
          .then((res) => {
            expect(res.body).to.be.empty;
          });


      });
    });
    describe("when it was authorized", () => {
      it("should return 20 movies and a status 200", () => {
        request(api)
          .get("/api/movies")
          .set("Accept", "application/json")
          .set("Authorization", token)

          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(20);

          });
      });
    });
  });

  describe("GET /movies/:id", () => {
    describe("when it was unauthorized", () => {
      it("should return errors", () => {
        return request(api)

          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .then((res) => {
            expect(res.body).to.be.empty;
          });


      });
    });
    describe("when it was authorized", () => {
      describe("when the id is valid", () => {
        it("should return the matching movie", () => {
          request(api)

            .get(`/api/movies/${sampleMovie.id}`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("title", sampleMovie.title);
            });
        });
      });
      describe("when the id is invalid", () => {
        it("should return the NOT found message", () => {
          request(api)

            .get("/api/movies/xxx")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(500);
        });
      });
    });
  });







 /*describe("POST /movies ", () => {

    describe("when it was authorized", () => {
      it("should return a 200 status and the confirmation message", () => {
        request(api)
          .post("/api/movies")
          .set("Accept", "application/json")
          .set("Authorization", "BEARER" + token)
          .send({
            title: "Jaws",
            id: 24428,
          })
          .expect(200)

      });
      after(() => {
        request(api)
          .get("/api/movies")
          .set("Accept", "application/json")
          .set("Authorization", "BEARER" + token)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(21);

          });
      });



    });
  });*/




  describe("DELETE /movies/:id ", () => {

    describe("when it was authorized", () => {
            describe("when the id is valid", () => {
        it("should remove movie", () => {
          request(api)

            .delete(`/api/movies/${sampleMovie.id}`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(200)
            
        });
        after(() => {
          request(api)
            .get("/api/movies")
            .set("Accept", "application/json")
            .set("Authorization", "BEARER" + token)
            .expect(200)
            .then((res) => {
              expect(res.body).to.be.a("array");
              expect(res.body.length).to.equal(19);
  
            });
        });
      });
      describe("when the id is invalid", () => {
        it("should return the NOT found message", () => {
          request(api)

            .get("/api/movies/xxx")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(500);
        });
      });



    });
  });

});