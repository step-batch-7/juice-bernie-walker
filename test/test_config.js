const assert = require("assert");
const { getDataStorePath, timeStamp } = require("../src/config.js");

describe("getDataStorePath", function() {
  it("should pick the path from the env variable", () => {
    const env = { JUICE_DATA_ACCESS_PATH: "data.json" };
    assert.strictEqual(getDataStorePath(env), "data.json");
  });
  it("should give default path when not configured", () => {
    const env = {};
    assert.strictEqual(getDataStorePath(env), "./.data/beverage_details.JSON");
  });
});

describe("timeStamp", function() {
  it("should give current time by default", function() {
    assert.deepStrictEqual(timeStamp({}), new Date());
  });
  it("should give stubbed time from env variable", function() {
    const stubbedDate = new Date("2019-01-01");
    const env = { NOW: stubbedDate.toJSON() };
    assert.deepStrictEqual(timeStamp(env), stubbedDate);
  });
});
