const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;

// Unit test for create movie
chai.use(chaiHttp);
describe("Test 1!", () => {
  it("Get all movies of the platform", done => {
    chai
      .request(app)
      .get("/api/")
      .end((err, res) => {
        expect(res.body.status).to.equals(200);
        expect(res.body.message).to.equals("Getting movies successfully");
        done();
      });
  });
});

// Unit test for Like Profile
chai.use(chaiHttp);
describe("Test 2!", () => {
  it("Get specifics movies by name", done => {
    chai
      .request(app)
      .get("/api/search/WALL-E")
      .end((err, res) => {
        expect(res.body.status).to.equals(200);
        expect(res.body.message).to.equals("Searching movies successfully");
        done();
      });
  });
});

// Unit test for Recomendation
chai.use(chaiHttp);
describe("Test 3!", () => {
  it("Search movies by genre and points", done => {
    chai
      .request(app)
      .get("/api/gender/Action/20/20/20/20/20")
      .end((err, res) => {
        expect(res.body.status).to.equals(200);
        expect(res.body.message).to.equals("Searching movies successfully");
        done();
        process.exit(0);
      });
  });
});
