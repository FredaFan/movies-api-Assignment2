import chai from "chai";
import request from "supertest";

import dotenv from 'dotenv';

const expect = chai.expect;
dotenv.config();

let api;
let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";


describe("Genres endpoint", () => {

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


  describe("GET /genres ", () => {
    it("should return 18 genres and a status 200", () => {
      request(api)
        .get("/api/genres")
        .set("Accept", "application/json")
        .set("Authorization", token)

        .expect(200)
        .then(res => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(18);

        });
    });
  });
});