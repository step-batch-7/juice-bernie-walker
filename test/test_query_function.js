const enquire = require("../src/query_function.js").enquire;
const assert = require("chai").assert;

describe("enquire", function() {
  const header = "Employee ID,Beverage,Quantity,Date";
  const footer1 = "Total: 0 Juices";
  const footer2 = "Total: 2 Juices";
  const footer3 = "Total: 1 Juices";

  const stampAndFs = {
    stamp: new Date(),
    fs: {
      readFileSync: function() {
        const array = [
          {
            employeeId: "25314",
            beverage: "grape",
            quantity: 1,
            date: "2019-11-20T05:50:28.267Z"
          },
          {
            employeeId: "25314",
            beverage: "orange",
            quantity: 1,
            date: "2019-11-23T05:50:28.268Z"
          },
          {
            employeeId: "25318",
            beverage: "orange",
            quantity: 1,
            date: "2019-11-20T05:50:28.269Z"
          },
          {
            employeeId: "25318",
            beverage: "mango",
            quantity: 1,
            date: "2019-11-23T05:50:28.260Z"
          }
        ];

        return JSON.stringify(array);
      },
      writeFileSync: function() {}
    }
  };

  it("should return error message for wrong Id or no input", function() {
    let actual = enquire.call(stampAndFs, {});
    const expected = [header, [], footer1];
    assert.deepStrictEqual(actual, expected);
    actual = enquire.call(stampAndFs, { id: "10101" });
    assert.deepStrictEqual(actual, expected);
    actual = enquire.call(stampAndFs, {
      id: "25314",
      date: "2019-11-23",
      beverage: "grape"
    });
    assert.deepStrictEqual(actual, expected);
  });

  it("should return the output table of requested employee for a certain ID", function() {
    const actual = enquire.call(stampAndFs, { id: "25314" });
    const expected = [
      header,
      [
        {
          employeeId: "25314",
          beverage: "grape",
          quantity: 1,
          date: "2019-11-20T05:50:28.267Z"
        },
        {
          employeeId: "25314",
          beverage: "orange",
          quantity: 1,
          date: "2019-11-23T05:50:28.268Z"
        }
      ],
      footer2
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give back the output table of a requested employee for a certain date", function() {
    const actual = enquire.call(stampAndFs, { date: "2019-11-23" });
    const expected = [
      header,
      [
        {
          employeeId: "25314",
          beverage: "orange",
          quantity: 1,
          date: "2019-11-23T05:50:28.268Z"
        },
        {
          employeeId: "25318",
          beverage: "mango",
          quantity: 1,
          date: "2019-11-23T05:50:28.260Z"
        }
      ],
      footer2
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give back the information of a requested employee for a certain beverage", function() {
    const actual = enquire.call(stampAndFs, { beverage: "orange" });
    const expected = [
      header,
      [
        {
          employeeId: "25314",
          beverage: "orange",
          quantity: 1,
          date: "2019-11-23T05:50:28.268Z"
        },
        {
          employeeId: "25318",
          beverage: "orange",
          quantity: 1,
          date: "2019-11-20T05:50:28.269Z"
        }
      ],
      footer2
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give back the employee details for a certain date,id and beverage in any order", function() {
    let actual = enquire.call(stampAndFs, {
      id: "25314",
      date: "2019-11-23"
    });
    let expected = [
      header,
      [
        {
          employeeId: "25314",
          beverage: "orange",
          quantity: 1,
          date: "2019-11-23T05:50:28.268Z"
        }
      ],
      footer3
    ];
    assert.deepStrictEqual(actual, expected);

    actual = enquire.call(stampAndFs, {
      date: "2019-11-23",
      id: "25318",
      beverage: "mango"
    });
    expected = [
      header,
      [
        {
          employeeId: "25318",
          beverage: "mango",
          quantity: 1,
          date: "2019-11-23T05:50:28.260Z"
        }
      ],
      footer3
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
