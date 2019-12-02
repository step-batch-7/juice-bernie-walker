const save = require("../src/saveTransaction_function.js").saveTransaction;
const fs = require("fs");
const assert = require("chai").assert;

describe("save", function() {
  const line1 = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  let object = [];
  const stampAndFs = {
    stamp: new Date(),
    fs: {
      existsSync: () => true,
      readFileSync: function() {
        return JSON.stringify(object);
      },
      writeFileSync: function(path, content, encoding) {
        object = content;
      }
    }
  };
  const testInput = [{ id: "11111", type: "banana", qty: "1" }];

  it("should display the deatails for the entered employee Id", function() {
    const actual = save.apply(stampAndFs, testInput);
    const expected = [
      line1,
      [
        {
          employeeId: "11111",
          beverage: "banana",
          quantity: 1,
          date: stampAndFs.stamp.toJSON()
        }
      ]
    ];
    assert.deepStrictEqual(actual, expected);
    assert.deepStrictEqual(JSON.parse(object), [
      {
        employeeId: "11111",
        beverage: "banana",
        quantity: 1,
        date: stampAndFs.stamp.toJSON()
      }
    ]);
  });
});
