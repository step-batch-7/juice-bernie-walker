const saveTransaction = function(userInput) {
  let beverageLog = JSON.parse(this.fs.readFileSync(this.path, "utf8"));

  employeeId = userInput.id;
  beverageType = userInput.type;
  qty = +userInput.qty;

  const header = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  const newEntry = {
    employeeId: employeeId,
    beverage: beverageType,
    quantity: qty,
    date: this.stamp
  };

  beverageLog.push(newEntry);

  this.fs.writeFileSync(
    this.path,
    JSON.stringify(beverageLog, null, 2),
    "utf8"
  );

  newEntry.date = newEntry.date.toJSON();

  return [header, [newEntry]];
};

exports.saveTransaction = saveTransaction;
