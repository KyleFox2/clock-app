const request = require("supertest");
const app = require("../server");

describe("GET /", () => {
  test('responds with HTML containing "/"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("/");
  });

  test('responds with HTML containing "/stopwatch"', async () => {
    const response = await request(app).get("/stopwatch");
    expect(response.status).toBe(200);
    expect(response.text).toContain("/stopwatch");
  });

  test('responds with HTML containing "/timersetup"', async () => {
    const response = await request(app).get("/timersetup");
    expect(response.status).toBe(200);
    expect(response.text).toContain("/timersetup");
  });

  test('responds with HTML containing "/timer"', async () => {
    const response = await request(app).get("/timer");
    expect(response.status).toBe(200);
    expect(response.text).toContain("/timer");
  });

  test('responds with HTML containing "/worldclock"', async () => {
    const response = await request(app).get("/worldclock");
    expect(response.status).toBe(200);
    expect(response.text).toContain("/worldclock");
  });

  test('responds with HTML containing "/worldclock"', async () => {
    const response = await request(app).get("/worldclock");
    expect(response.status).toBe(200);
    expect(response.text).toContain("/worldclock");
  });

  test("responds with 404 for non-existent route", async () => {
    const response = await request(app).get("/nonexistent");
    expect(response.status).toBe(404);
  });
});
