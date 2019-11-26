const save = require("../src/saveTransaction_function.js").saveTransaction;
const fs = require("fs");
const assert = require("assert");

describe("save", function() {
  const line1 = "Transaction recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  const stampAndFs = {
    stamp: new Date(),
    fs: {
      readFileSync: function() {
        const object = {
          25314: {
            employeeId: "25314",
            beverageInfo: [
              {
                beverage: "mango",
                quantity: 1,
                date: "2019-11-20T05:50:28.267Z"
              }
            ],
            beverageCount: 1
          }
        };
        return JSON.stringify(object);
      },
      writeFileSync: function() {}
    }
  };
  const testInput = [["11111", "banana", "1"]];

  it("should display the deatails of the enterd employee", function() {
    const actual = save.apply(stampAndFs, testInput);
    const expected = line1 + "11111,banana,1," + stampAndFs.stamp.toJSON();
    assert.strictEqual(actual, expected);
  });
});
