const recordModifier = require("./record_modifier.js").recordModifier;
const fs = require("fs");

const saveTransaction = function(userInput) {
  let beverageLog = JSON.parse(fs.readFileSync(this.readPath, "utf8"));

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

  fs.writeFileSync(
    this.writePath,
    JSON.stringify(beverageLog, null, 2),
    "utf8"
  );

  const printMessage = `${employeeId},${newEntry.beverage},${
    newEntry.quantity
  },${newEntry.date.toJSON()}`;

  return header + printMessage;
};

exports.saveTransaction = saveTransaction;
