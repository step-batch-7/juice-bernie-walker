const assert = require("chai").assert;
const getEmployeeLog = require("../src/juice_utils.js").getEmployeeLog;
const filterDesiredLog = require("../src/juice_utils.js").filterDesiredLog;
const areDatesEqual = require("../src/juice_utils.js").areDatesEqual;
const getPrintableOutput = require("../src/juice_utils.js").getPrintableOutput;

describe("getEmployeeLog", function() {
  const array = [
    {
      employeeId: "12345",
      a: "someContent"
    },
    {
      employeeId: "123456",
      b: "someOtherContent"
    }
  ];

  it("should get the employee log of the entered id", function() {
    const actual = getEmployeeLog(array, "12345");
    const expected = [{ a: "someContent", employeeId: "12345" }];
    assert.deepStrictEqual(actual, expected);
  });

  it("should get the entire data if the id is undefined", function() {
    const actual = getEmployeeLog(array, undefined);
    const expected = [
      { a: "someContent", employeeId: "12345" },
      { b: "someOtherContent", employeeId: "123456" }
    ];
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
      beverage: "orange",
      quantity: 1,
      date: "2019-11-20T05:50:28.267Z"
    }
  ];

  it("should filter the records having a certain given date", function() {
    const actual = filterDesiredLog(array, "2019-11-23", undefined);
    const expected = {
      result: [
        {
          employeeId: "25314",
          beverage: "mango",
          quantity: 1,
          date: "2019-11-23T05:50:28.267Z"
        }
      ],
      beverageCount: 1
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should get all the details of given beverage", function() {
    const actual = filterDesiredLog(array, undefined, "orange");
    const expected = {
      result: [
        {
          employeeId: "25314",
          beverage: "orange",
          quantity: 1,
          date: "2019-11-20T05:50:28.267Z"
        }
      ],
      beverageCount: 1
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should get all the records if the date and beverage is undefined", function() {
    const actual = filterDesiredLog(array, undefined);
    const expected = {
      result: [
        {
          employeeId: "25314",
          beverage: "mango",
          quantity: 1,
          date: "2019-11-23T05:50:28.267Z"
        },
        {
          employeeId: "25314",
          beverage: "orange",
          quantity: 1,
          date: "2019-11-20T05:50:28.267Z"
        }
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

describe("getPrintableOutput", function() {
  const header = "Sample header";
  const footer = "Sample footer";
  it("should produce the printable output for the given header, footer and body", function() {
    const body = [
      { employeeId: "1", beverage: "a", quantity: 2, date: "1-2-3" }
    ];
    const actual = getPrintableOutput([header, body, footer]);
    const expected = `${header}\n1,a,2,1-2-3\n${footer}`;
    assert.deepStrictEqual(actual, expected);
  });

  it("should be able to get printable output when there are more than one arrays in the body", function() {
    const body = [
      { employeeId: "1", beverage: "a", quantity: 2, date: "1-2-3" },
      { employeeId: "1", beverage: "a", quantity: 2, date: "1-2-3" }
    ];
    const actual = getPrintableOutput([header, body, footer]);
    const expected = `${header}\n1,a,2,1-2-3\n1,a,2,1-2-3\n${footer}`;
    assert.deepStrictEqual(actual, expected);
  });

  it("should not insert a new line for footer if it is not present", function() {
    const body = [
      { employeeId: "1", beverage: "a", quantity: 2, date: "1-2-3" }
    ];
    const actual = getPrintableOutput([
      header,
      [{ employeeId: "1", beverage: "a", quantity: 2, date: "1-2-3" }]
    ]);
    const expected = `${header}\n1,a,2,1-2-3`;
    assert.strictEqual(actual, expected);
  });

  it("should not enter a plane new line when the body array is empty", function() {
    const actual = getPrintableOutput([header, [], footer]);
    const expected = `${header}\n${footer}`;
    assert.strictEqual(actual, expected);
  });
});
