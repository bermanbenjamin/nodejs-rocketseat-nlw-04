import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("should be able create a survey", async () => {
    const response = await request(app)
      .post("/surveys")
      .send({
        survey: {
          title: "survey example",
          description: "survey example description",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able list all surveys", async () => {
    await request(app)
      .post("/surveys")
      .send({
        survey: {
          title: "survey example 2",
          description: "survey example 2 description",
        },
      });

    const response = await request(app).get("/surveys");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
