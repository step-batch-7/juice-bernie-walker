const save = require("../src/saveTransaction_function.js").saveTransaction;
const fs = require("fs");
const assert = require("assert");

describe("save", function() {
  const line1 = "Transaction recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  const sampAndPath = { stamp: new Date(), path: "./test/.tmp.txt" };
  const testInput = [["11111", "banana", "1"]];

  it("should display the deatails of the enterd employee", function() {
    const actual = save.apply(sampAndPath, testInput);
    const expected = line1 + "11111,banana,1," + sampAndPath.stamp.toJSON();
    assert.strictEqual(actual, expected);
    fs.writeFileSync("test/.tmp.txt", "", "utf8");
  });
});
