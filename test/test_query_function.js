const enquire = require("../src/query_function.js").enquire;
const assert = require("assert");

describe("enquire", function() {
  const line1 = "Employee ID,Beverage,Quantity,Date";
  const line2 = "\n25314,mango,1,2019-11-20T05:50:28.267Z";
  const line3 = "\nTotal: " + 1 + " Juices";

  const stampAndPath = {
    stamp: new Date(),
    writePath: "./test/.write_fake_database.json",
    readPath: "./test/.read_fake_database.json"
  };

  it("should return error message for wrong Id or no input", function() {
    let actual = enquire.call(stampAndPath, []);
    assert.strictEqual(actual, "Employee details do not exist");
    actual = enquire.call(stampAndPath, ["01010"]);
    assert.strictEqual(actual, "Employee details do not exist");
  });

  it("should return the output table of requested employee for a certain ID", function() {
    const actual = enquire.call(stampAndPath, ["25314"]);
    const expected = line1 + line2 + line3;
    assert.strictEqual(actual, expected);
  });
});
