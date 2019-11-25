const recordModifier = require("./record_modifier.js").recordModifier;
const fs = require("fs");

let beverageLog = JSON.parse(
  fs.readFileSync("./src/.beverage_details.JSON", "utf8")
);

const saveTransaction = function(userInput) {
  employeeId = userInput[0];
  beverageType = userInput[1];
  qty = +userInput[2];

  const header = "Transaction recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  const newEntry = {
    beverage: beverageType,
    quantity: qty,
    date: this.stamp
  };

  recordModifier(beverageLog, employeeId, newEntry);

  fs.writeFileSync(this.path, JSON.stringify(beverageLog, null, 2), "utf8");

  const printMessage =
    employeeId +
    "," +
    newEntry.beverage +
    "," +
    newEntry.quantity +
    "," +
    newEntry.date.toJSON();

  return header + printMessage;
};

exports.saveTransaction = saveTransaction;
