const request = require("supertest");
const app = require("../src");

describe("GET /api", () => {
  it("Should return response", async () => {
    const results = await request(app).get("/api");
    expect(results.status).toBe(200);
    expect(results.text).toEqual("<h1>API in TURBOREPO</h1>");
  });
});
