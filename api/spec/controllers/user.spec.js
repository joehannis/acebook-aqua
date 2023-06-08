const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/user", () => {
    beforeAll( async () => {
        const user = new User({
          email: "test@test.com",
          password: "12345678",
          firstName: "Test",
          lastName: "Testson",
          userName: "testy"
        });
        await user.save();
    
        token = JWT.sign({
          user_id: user.id,
          // Backdate this token of 5 minutes
          iat: Math.floor(Date.now() / 1000) - (5 * 60),
          // Set the JWT token to expire in 10 minutes
          exp: Math.floor(Date.now() / 1000) + (10 * 60)
        }, secret);
      });

      afterAll( async () => {
        await User.deleteMany({});
      })

      describe("GET, when token is present", () => {
        test("returns user first name, last name and username for a given user password", async () => {
            const email = "test@test.com";
            User.findOne({ email: email }).then(async (user) => {
            let response = await request(app)
                .get("/user")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    email: email,
                    token: token});
            let userDetails = response.body.user;
            expect(userDetails.firstName).toEqual("Test");
            expect(userDetails.lastName).toEqual("Testson");
            expect(userDetails.userName).toEqual("testy");

          });
        })
    
        xtest("the response code is 200", async () => {
          
        })
    
        xtest("returns a new token", async () => {
          
        })
      })






});