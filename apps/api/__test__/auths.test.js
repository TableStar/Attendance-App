const request = require("supertest");
const app = require("../src");

describe("route AUTHS", () => {
  //GOOD CASE
  it("Try to get all data employee", async () => {
    const response = await request(app).get("/api/auths");
    // console.log(response);
    expect(response.status).toBe(200);
  });

  it("Try to filter data by specific name 200", async () => {
    const response = await request(app).get(
      "/api/auths?username=DEV-001-Haguruma"
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("get employee success");
  });
  //BAd CASE
  it("Try to filter data by specific name 401", async () => {
    const response = await request(app).get(
      "/api/auths?username=ACC-007-Karno"
    );
    expect(response.status).toBe(500);
    expect(response.body.error).toEqual("employee not found");
  });
});
