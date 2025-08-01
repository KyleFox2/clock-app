const request = require("supertest");
const app = require("../server");

describe("Route: GET /", () => {
  test("responds with 200 and contains homepage content", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe("Route: GET /stopwatch", () => {
  test("responds with 200 and contains Stopwatch content", async () => {
    const response = await request(app).get("/stopwatch");
    expect(response.status).toBe(200);
  });
});

describe("Route: GET /timersetup", () => {
  test("responds with 200 and contains Timer Setup content", async () => {
    const response = await request(app).get("/timersetup");
    expect(response.status).toBe(200);
  });
});

describe("Route: GET /timer", () => {
  test("responds with 200 and contains Timer content", async () => {
    const response = await request(app).get("/timer");
    expect(response.status).toBe(200);
  });
});

describe("Route: GET /worldclock", () => {
  test("responds with 200 and contains World Clock content", async () => {
    const response = await request(app).get("/worldclock");
    expect(response.status).toBe(200);
  });
});

describe("Route: GET /nonexistent", () => {
  test("responds with 404 for non-existent route", async () => {
    const response = await request(app).get("/nonexistent");
    expect(response.status).toBe(404);
  });
});
