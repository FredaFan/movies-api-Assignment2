import chai from "chai";
import request from "supertest";
import dotenv from 'dotenv';
const mongoose = require("mongoose");


const expect = chai.expect;
dotenv.config();

let api;
let token
const sampleMovie = {
  id: 337401,
  title: "Mulan",
};

const sampleReview = {
  author: "msbreviews",
  content: "If you enjoy reading my Spoiler-Free reviews, please follow my blog @\r\nhttps://www.msbreviews.com\r\n\r\nAs you might now",
};

describe("Movies endpoint", () => {

  beforeEach(async () => {
    try {
      api = require("../../../../index");

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
      beforeEach(async () => {
        request(api)
          .post("/api/users")
          .send({
            username: "user1",
            password: "test1",


          })
          .expect(200)
          .then(res => {
            token = res.body.token;
          });
      });
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







  describe("POST /movies ", () => {

    describe("when it posts correctly", () => {
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

    describe("when it does not post correctly", () => {
      it("should return the error message", () => {
        request(api)

        .post("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", "BEARER" + token)
        .send({
          id: 24428,
        })
        .expect(405)
      });
    });
  });


  describe("GET /movies/:id/reviews", () => {
    describe("when it was unauthorized", () => {
      it("should return errors", () => {
        return request(api)

          .get(`/api/movies/${sampleMovie.id}/reviews`)
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

            .get(`/api/movies/${sampleMovie.id}/reviews`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("author", sampleReview.author);
            });
        });
      });
      describe("when the id is invalid", () => {
        it("should return the NOT found message", () => {
          request(api)

            .get("/api/movies/xxx/reviews")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect(500);
        });
      });
    });
  });



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