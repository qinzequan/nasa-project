const request = require("supertest");
const { disable } = require("../../app");
const app = require("../../app");

const { mongoConnect, mongoClose } = require("../../services/mongo");

const launch = {
  launchDate: "December 27,2030",
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  target: "Kepler-1652 b",
};

const lackLaunchDateLaunch = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  target: "Kepler-1652 b",
};

const invalidDateLaunch = {
  launchDate: "hello",
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  target: "Kepler-1652 b",
};

describe("Test launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoClose();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    test("Launch missing required attributes", async () => {
      const response = await request(app)
        .post("/launches")
        .send(lackLaunchDateLaunch)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Launch missing required attributes",
      });
    });

    test("Date format error", async () => {
      const response = await request(app)
        .post("/launches")
        .send(invalidDateLaunch)
        .expect(400);
      expect(response.body).toStrictEqual({ error: "Date format error" });
    });

    test("It should respond with 201 create", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launch)
        .expect(201)
        .expect("Content-Type", /json/);
      response.body.launchDate = new Date(response.body.launchDate).valueOf();
      launch.launchDate = new Date(launch.launchDate).valueOf();
      expect(response.body).toMatchObject(launch);
    });
  });
});
