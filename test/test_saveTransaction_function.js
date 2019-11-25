const save = require("../src/saveTransaction_function.js").saveTransaction;
const fs = require("fs");
const assert = require("assert");

describe("save", function() {
  const line1 = "Transaction recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  const stampAndPath = {
    stamp: new Date(),
    writePath: "./test/.write_fake_database.json",
    readPath: "./test/.read_fake_database.json"
  };
  const testInput = [["11111", "banana", "1"]];

  it("should display the deatails of the enterd employee", function() {
    const actual = save.apply(stampAndPath, testInput);
    const expected = line1 + "11111,banana,1," + stampAndPath.stamp.toJSON();
    assert.strictEqual(actual, expected);
    fs.writeFileSync("test/.write_fake_database.json", "", "utf8");
  });
});
