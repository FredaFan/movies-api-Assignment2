import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Users from "../../../../api/users/userModel";
import dotenv from 'dotenv';

const expect = chai.expect;
dotenv.config();

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

describe("People endpoint", () => {

    beforeEach(async () => {
        try {
            api = require("../../../../index");
            await Genre.deleteMany({});
            await Genre.collection.insertMany(users);
        } catch (err) {
            console.error(`failed to Load genre Data: ${err}`);
        }
    });
    afterEach(() => {
        api.close(); // Release PORT 8080
        delete require.cache[require.resolve("../../../../index")];
    });



    describe("GET /people ", () => {
        it("should return 3 people and a status 200", () => {
            request(api)
                .get("/api/people")
                .set("Accept", "application/json")
                .set("Authorization", token)

                .expect(200)
                .then(res => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(3);

                });
        });
    });
});