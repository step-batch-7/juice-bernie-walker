const recordModifier = require("./record_modifier.js").recordModifier;
const fs = require("fs");

let beverageLog = fs.readFileSync("./src/.beverage_details.JSON", "utf8");
beverageLog = JSON.parse(beverageLog);

const saveTransaction = function(userInput) {
  empId = userInput[1];
  bevType = userInput[3];
  qty = +userInput[5];

  const header = "Transaction recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  const newEntry = {
    beverage: bevType,
    quantity: qty,
    date: this.stamp
  };

  recordModifier(beverageLog, empId, newEntry);

  fs.writeFileSync(this.path, JSON.stringify(beverageLog, null, 2), "utf8");

  const printMessage =
    userInput[1] +
    "," +
    newEntry.beverage +
    "," +
    newEntry.quantity +
    "," +
    newEntry.date.toJSON();

  return header + printMessage;
};

exports.saveTransaction = saveTransaction;
