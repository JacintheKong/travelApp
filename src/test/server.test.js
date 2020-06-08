import { submitForm, removeTrip, addTrip } from "../client/js/app";

describe("Test, the functions should exist", () => {
  test("submitForm should return true", async () => {
     expect(submitForm).toBeDefined();
  });
  test("removeTrip should return true", async () => {
     expect(removeTrip).toBeDefined();
  });
  test("addTrip should return true", async () => {
     expect(addTrip).toBeDefined();
  });
});

