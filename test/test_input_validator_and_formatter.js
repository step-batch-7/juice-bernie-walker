const validatorAndFormatter = require("../src/input_validator_and_formatter.js")
  .validatorAndFormatter;
const assert = require("assert");

describe("validatorAndFormatter", function() {
  it("should give back an error array for no or wrong key function", function() {
    let actual = validatorAndFormatter([]);
    let expected = ["error", {}];
    assert.deepStrictEqual(actual, expected);
    actual = validatorAndFormatter(["--wrong", "--empId", "12345"]);
    expected = ["error", {}];
    assert.deepStrictEqual(actual, expected);
  });

  describe("queryValidatorAndFormatter", function() {
    it("should validate inputs when right", function() {
      const actual = validatorAndFormatter(["--query", "--empId", "12345"]);
      const expected = ["--query", { id: "12345" }];
      assert.deepStrictEqual(actual, expected);
    });

    it("should validate the inputs when wrong keyword given", function() {
      const actual = validatorAndFormatter([
        "--query",
        "empId or wrong",
        "12345"
      ]);
      const expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
    });

    it("should validate the inputs when the number of arguements is not correct", function() {
      const actual = validatorAndFormatter([
        "--query",
        "--empId",
        "12345",
        "extraInfo"
      ]);
      const expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("saveValidatorAndFormatter", function() {
    it("sould validate the right inputs in any order and format them in right order", function() {
      let actual = validatorAndFormatter([
        "--save",
        "--empId",
        "12345",
        "--beverage",
        "mango",
        "--qty",
        "2"
      ]);
      let expected = ["--save", { id: "12345", type: "mango", qty: "2" }];
      assert.deepStrictEqual(actual, expected);
      actual = validatorAndFormatter([
        "--save",
        "--empId",
        "12345",
        "--qty",
        "2",
        "--beverage",
        "mango"
      ]);
      expected = ["--save", { id: "12345", type: "mango", qty: "2" }];
      assert.deepStrictEqual(actual, expected);
    });

    it("should validate wrong inputs when key words are wrong or missing", function() {
      let actual = validatorAndFormatter([
        "--save",
        "--empId",
        "12345",
        "wrong",
        "mango",
        "--qty",
        "2"
      ]);
      let expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
      actual = validatorAndFormatter([
        "--save",
        "--empId",
        "12345",
        "--empId",
        "mango",
        "--qty",
        "2"
      ]);
      expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
    });

    it("should validate when id or quantity are not numbers", function() {
      let actual = validatorAndFormatter([
        "--save",
        "--empId",
        "wrong",
        "--beverage",
        "mango",
        "--qty",
        "2"
      ]);
      let expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
      actual = validatorAndFormatter([
        "--save",
        "--empId",
        "25314",
        "--beverage",
        "mango",
        "--qty",
        "ab"
      ]);
      expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
    });

    it("should validate the inputs when wrong number of arguements given", function() {
      let actual = validatorAndFormatter([
        "--save",
        "--qty",
        "2",
        "--empId",
        "25314"
      ]);
      let expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
      actual = validatorAndFormatter([
        "--save",
        "--qty",
        "2",
        "--empId",
        "25314",
        "--beverage",
        "mango",
        "extraWrong"
      ]);
      expected = ["error", {}];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
