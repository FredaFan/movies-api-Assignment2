import chai from "chai";
import request from "supertest";
import dotenv from 'dotenv';


const expect = chai.expect;
dotenv.config();

let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";
const sampleMovie = {
  id: 337401,
  title: "Mulan",
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
    it("should return 20 movies and a status 200", () => {
         request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", "BEARER" + token)
        
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
          .set("Authorization", "BEARER" + token)
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
          .set("Authorization", "BEARER" + token)
          .expect(500);
      });
    });
  });
});
});