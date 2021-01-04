import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Genre from "../../../../api/genres/genreModel";
import dotenv from 'dotenv';

const expect = chai.expect;
dotenv.config();

let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";
const genres = {
  id: 28,
  name: "Action",
};

describe("Genres endpoint", () => {
   
    beforeEach(async () => {
      try {
        api = require("../../../../index");
        await Genre.deleteMany({});
      await Genre.collection.insertMany(genres);
      } catch (err) {
        console.error(`failed to Load genre Data: ${err}`);
      }
    });
    afterEach(() => {
      api.close(); // Release PORT 8080
      delete require.cache[require.resolve("../../../../index")];
    });
  
  
    describe("GET /genres ", () => {
      it("should return 19 genres and a status 200", () => {
        request(api)
          .get("/api/genres")
          .set("Accept", "application/json")
          .set("Authorization", token)

          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(19);

          });
      });
    });
});