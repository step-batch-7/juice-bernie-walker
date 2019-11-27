const enquire = function(userInput) {
  let beverageLog = JSON.parse(
    this.fs.readFileSync("./src/.beverage_details.JSON", "utf8")
  );

  const employeeLog = beverageLog[userInput.id];
  let beverageCount = 0;
  let result = [];

  if (!(userInput.id in beverageLog)) return "Employee details do not exist";

  for (let index = 0; index < employeeLog.length; index++) {
    const infoLine = `${employeeLog[index].employeeId},${employeeLog[index].beverage},\
${employeeLog[index].quantity},${employeeLog[index].date}`;

    beverageCount = beverageCount + employeeLog[index].quantity;

    result.push(infoLine);
  }

  const header = "Employee ID,Beverage,Quantity,Date\n";
  const footer = "\nTotal: " + beverageCount + " Juices";

  return header + result.join("\n") + footer;
};

exports.enquire = enquire;
