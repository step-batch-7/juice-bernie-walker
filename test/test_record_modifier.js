const recordModifier = require("../src/record_modifier.js").recordModifier;
const assert = require("assert");
const fs = require("fs");

describe("recordModifier", function() {
  const testSampleFile = fs.readFileSync("./test/.test_samples.JSON", "utf8");

  it("should insert new record into given object if it doesn't already exist", function() {
    const testSamples = JSON.parse(testSampleFile);
    let testObject = testSamples.testObject;
    const testId = testSamples.insertionTestInput.id;
    const testEntry = testSamples.insertionTestInput.entry;
    recordModifier(testObject, testId, testEntry);
    const expected = testSamples.insertionTestExpected;
    assert.deepStrictEqual(testObject, expected);
  });

  it("should update the existing record", function() {
    const testSamples = JSON.parse(testSampleFile);
    let testObject = testSamples.testObject;
    const testId = testSamples.updationTestInput.id;
    const testEntry = testSamples.updationTestInput.entry;
    recordModifier(testObject, testId, testEntry);
    const expected = testSamples.updationTestExpected;
    assert.deepStrictEqual(testObject, expected);
  });
});
