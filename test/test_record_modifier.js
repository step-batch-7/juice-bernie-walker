const recordModifier = require("../src/record_modifier.js").recordModifier;
const assert = require("assert");
const fs = require("fs");

describe("recordModifier", function() {
  const testObjectString =
    '{"25318":[{"employeeId":"25318", "beverage":"grape", "quantity":1, "date":"2019-11-20T05:50:28.267Z"}]}';
  const insertionTestExpected =
    '{"25314": [{"employeeId":"25314", "beverage":"mango", "quantity": 2, "date": "2019-11-20T05:50:28.267Z"}],\
    "25318":[{"employeeId":"25318","beverage":"grape","quantity":1,"date":"2019-11-20T05:50:28.267Z"}]}';
  const updationTestExpected =
    '{"25318":[{"employeeId":"25318","beverage":"grape","quantity":1,"date":"2019-11-20T05:50:28.267Z"},\
    {"employeeId":"25318","beverage":"banana","quantity":1,"date":"2019-11-20T05:50:28.267Z"}]}';

  it("should insert new record into given object if it doesn't already exist", function() {
    let testObject = JSON.parse(testObjectString);
    const testId = "25314";
    const testEntry = {
      beverage: "mango",
      quantity: 2,
      date: "2019-11-20T05:50:28.267Z"
    };
    const expected = JSON.parse(insertionTestExpected);
    recordModifier(testObject, testId, testEntry);
    assert.deepStrictEqual(testObject, expected);
  });

  it("should update the existing record", function() {
    let testObject = JSON.parse(testObjectString);
    const testId = "25318";
    const testEntry = {
      beverage: "banana",
      quantity: 1,
      date: "2019-11-20T05:50:28.267Z"
    };
    const expected = JSON.parse(updationTestExpected);
    recordModifier(testObject, testId, testEntry);
    assert.deepStrictEqual(testObject, expected);
  });
});
