const recordModifier = require("./record_modifier.js").recordModifier;

const saveTransaction = function(userInput) {
  let beverageLog = JSON.parse(
    this.fs.readFileSync("./src/.beverage_details.JSON", "utf8")
  );

  employeeId = userInput.id;
  beverageType = userInput.type;
  qty = +userInput.qty;

  const header = "Transaction recorded:\nEmployee ID,Beverage,Quantity,Date\n";
  const newEntry = {
    beverage: beverageType,
    quantity: qty,
    date: this.stamp
  };

  recordModifier(beverageLog, employeeId, newEntry);

  this.fs.writeFileSync(
    "./src/.beverage_details.JSON",
    JSON.stringify(beverageLog, null, 2),
    "utf8"
  );

  const printMessage = `${employeeId},${newEntry.beverage},${
    newEntry.quantity
  },${newEntry.date.toJSON()}`;

  return header + printMessage;
};

exports.saveTransaction = saveTransaction;
