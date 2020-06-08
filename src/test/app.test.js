const supertest = require("supertest");
const app = require("../server/app");
const req = supertest(app);

let trip = {
  city: "test",
  country: "test country",
};

describe("Test API endpoints", () => {
  test("POST /trips -> Successfuly create a trip", async () => {
    const res = await req
      .post("/trips")
      .send({ trip })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    trip.id = res.body[0].id;

    expect(res.body[0].city).toBe(trip.city);
    expect(res.body[0].country).toBe(trip.country);
    expect(res.body[0].population).toBe(trip.population);
    expect(res.body[0].id).toBeTruthy();
  });

  test("GET /trips -> Successfuly get trips", async () => {
    const res = await req.get("/trips").expect(200);
    expect(res.body.length).toBe(1);
  });

  test("Delete /trips -> Successfuly delete a trip", async () => {
    const res = await req
      .delete(`/trips/${trip.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.length).toBe(0);
  });
});
