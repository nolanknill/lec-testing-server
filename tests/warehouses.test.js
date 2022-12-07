const request = require("supertest");
const app = require("../server");
const knex = require("../knex");
const _ = require("lodash");
const warehousesFixture = require("../seeds/data/warehouses");
const destroyDb = require("./cleanup/destroydb");

beforeAll(async () => {
  // Starts from a fresh db
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
  await destroyDb();
});

describe("Warehouse Controller Tests", () => {
  test("should lists all warehouses", async () => {
    const res = await request(app).get("/warehouses");
    expect(res.status).toEqual(200);
    expect(_.sortBy(res.body, ["id"])).toEqual(
      _.sortBy(warehousesFixture, ["id"])
    );
  });

  test("should get a single warehouse", async () => {
    const seattle = warehousesFixture.find(
      (el) => el.warehouse_name === "Seattle"
    );
    const res = await request(app).get(`/warehouses/${seattle.id}`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(seattle);
  });

  test("should 404 getting a non-existent warehouse", async () => {
    const fakeId = "0000000000000000000000";
    const res = await request(app).get(`/warehouses/${fakeId}`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.statusCode).toEqual(404);
  });
});
