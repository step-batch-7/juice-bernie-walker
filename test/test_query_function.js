const enquire = require("../src/query_function.js").enquire;
const assert = require("chai").assert;

describe("enquire", function() {
  const line1 = "Employee ID,Beverage,Quantity,Date";
  const line2a = "\n25314,mango,1,2019-11-23T05:50:28.267Z";
  const line2b =
    "\n25314,mango,1,2019-11-23T05:50:28.267Z\n25318,orange,1,2019-11-23T05:50:28.267Z";
  const line2c = "\n25318,orange,1,2019-11-23T05:50:28.267Z";
  const line3a = "\nTotal: " + 1 + " Juices";
  const line3b = "\nTotal: " + 2 + " Juices";

  const stampAndFs = {
    stamp: new Date(),
    fs: {
      readFileSync: function() {
        const object = {
          25314: [
            {
              employeeId: "25314",
              beverage: "mango",
              quantity: 1,
              date: "2019-11-23T05:50:28.267Z"
            }
          ],
          25318: [
            {
              employeeId: "25318",
              beverage: "grape",
              quantity: 1,
              date: "2019-11-20T05:50:28.267Z"
            },
            {
              employeeId: "25318",
              beverage: "orange",
              quantity: 1,
              date: "2019-11-23T05:50:28.267Z"
            }
          ]
        };
        return JSON.stringify(object);
      },
      writeFileSync: function() {}
    }
  };

  it("should return error message for wrong Id or no input", function() {
    let actual = enquire.call(stampAndFs, {});
    assert.strictEqual(actual, "Employee details do not exist");
    actual = enquire.call(stampAndFs, { id: "10101" });
    assert.strictEqual(actual, "Employee details do not exist");
    actual = enquire.call(stampAndFs, { id: "25314", date: "2019-11-20" });
    assert.strictEqual(actual, "Employee details do not exist");
  });

  it("should return the output table of requested employee for a certain ID", function() {
    const actual = enquire.call(stampAndFs, { id: "25314" });
    const expected = line1 + line2a + line3a;
    assert.strictEqual(actual, expected);
  });

  it("should give back the output table of a requested employee for a certain date", function() {
    const actual = enquire.call(stampAndFs, { date: "2019-11-23" });
    const expected = line1 + line2b + line3b;
    assert.strictEqual(actual, expected);
  });

  it("should give back the employee details for a certain date and id in any order", function() {
    let actual = enquire.call(stampAndFs, {
      id: "25314",
      date: "2019-11-23"
    });
    let expected = line1 + line2a + line3a;
    assert.strictEqual(actual, expected);

    actual = enquire.call(stampAndFs, {
      date: "2019-11-23",
      id: "25318"
    });
    expected = line1 + line2c + line3a;
    assert.strictEqual(actual, expected);
  });
});
