const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
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