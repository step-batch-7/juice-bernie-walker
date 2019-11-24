const save = require("../src/saveTransaction_function.js").saveTransaction;
const fs = require("fs");
const assert = require("assert");

describe("save", function() {
  const line1 = "Transaction recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  const timeStamp = { stamp: new Date(), path: "./test/.tmp.txt" };
  const testInput = [
    ["--empId", "11111", "--beverage", "banana", "--qty", "1"]
  ];

  it("should display the deatails of the enterd employee", function() {
    const actual = save.apply(timeStamp, testInput);
    const expected = line1 + "11111,banana,1," + timeStamp.stamp.toJSON();
    assert.strictEqual(actual, expected);
  });
});
