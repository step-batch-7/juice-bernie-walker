const getEmployeeLog = require("../src/juice_utils.js").getEmployeeLog;
const filterDesiredLog = require("../src/juice_utils.js").filterDesiredLog;
const areDatesEqual = require("../src/juice_utils.js").areDatesEqual;
const assert = require("chai").assert;

describe("getEmployeeLog", function() {
  const object = {
    "12345": [
      {
        a: "someContent"
      }
    ],
    "123456": [
      {
        b: "someOtherContent"
      }
    ]
  };

  it("should get the employee log of the entered id", function() {
    const actual = getEmployeeLog(object, "12345");
    const expected = [{ a: "someContent" }];
    assert.deepStrictEqual(actual, expected);
  });

  it("should get the entire data if the id is undefined", function() {
    const actual = getEmployeeLog(object, undefined);
    const expected = [{ a: "someContent" }, { b: "someOtherContent" }];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("filterDesiredLog", function() {
  const array = [
    {
      employeeId: "25314",
      beverage: "mango",
      quantity: 1,
      date: "2019-11-23T05:50:28.267Z"
    },
    {
      employeeId: "25314",
      beverage: "mango",
      quantity: 1,
      date: "2019-11-20T05:50:28.267Z"
    }
  ];

  it("should filter the records having a certain given date", function() {
    const actual = filterDesiredLog(array, "2019-11-23");
    const expected = {
      result: ["25314,mango,1,2019-11-23T05:50:28.267Z"],
      beverageCount: 1
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should get all the records if the id is undefined", function() {
    const actual = filterDesiredLog(array, undefined);
    const expected = {
      result: [
        "25314,mango,1,2019-11-23T05:50:28.267Z",
        "25314,mango,1,2019-11-20T05:50:28.267Z"
      ],
      beverageCount: 2
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("areDatesEqual", function() {
  it("should affirm if two dates are equal", function() {
    const actual = areDatesEqual("2019-11-20", "2019-11-20T05:50:28.267Z");
    assert.isTrue(actual);
  });

  it("should deny if two dates are not equal", function() {
    const actual = areDatesEqual("2019-11-23", "2019-11-20T05:50:28.267Z");
    assert.isFalse(actual);
  });
});
