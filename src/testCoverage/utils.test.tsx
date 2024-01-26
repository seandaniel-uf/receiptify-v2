import {
  currentDate,
  generateRandomNumber,
  returnTimeRange,
  formatTimeFromSeconds,
  addTotal,
} from "../utils.ts";

describe("Utility helper functions", () => {
  it("should return the current date", () => {
    expect(currentDate).toEqual("Thursday, January 25, 2024");
  });
});
