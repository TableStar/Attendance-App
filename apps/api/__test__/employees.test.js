const request = require("supertest")
const app = require("../src")

describe("GET data from route EMPLOYEES", () => {
    // GOOD CASE
    it("should return all data EMPLOYEES", async () => {
        const result = await request(app)
            .get("/api/auths").set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Imh1bWFuUmVzb3VyY2UiLCJpYXQiOjE3MDA3MTMwMzR9.0FtOiGhYbH0Sm4x3XwX5SiTFbRDoNQ1GSWLNoCDbIZo");
        expect(result.status).toBe(200);
        console.log(result.body);
    })

    // // GOOD CASE
    // it("try to filter data by specific name", async () => {
    //     const result = await request(app).get("/api/auths?username=hans");
    //     expect(result.status).toBe(200);
    // })

    // // BAD CASE
    // it("try to filter data by specific name", async () => {
    //     const result = await request(app).get("/api/auths?username=hans14314");
    //     expect(result.status).toBe(404);
    //     expect(result.body.message).toEqual("Employee not found.")
    // })
})