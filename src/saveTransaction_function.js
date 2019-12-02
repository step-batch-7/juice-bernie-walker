const { loadContent } = require("./juice_utils.js");

const saveTransaction = function(userInput) {
  let beverageLog = loadContent(this.fs, this.path);

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
  try {
    this.fs.writeFileSync(
      this.path,
      JSON.stringify(beverageLog, null, 2),
      "utf8"
    );
  } catch (e) {
    this.fs.mkdirSync("./.data");
    this.fs.writeFileSync(
      this.path,
      JSON.stringify(beverageLog, null, 2),
      "utf8"
    );
  }

  newEntry.date = newEntry.date.toJSON();

  return [header, [newEntry]];
};

exports.saveTransaction = saveTransaction;
