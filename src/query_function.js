const enquire = function(userInput) {
  let beverageLog = JSON.parse(
    this.fs.readFileSync("./src/.beverage_details.JSON", "utf8")
  );

  const employeeLog = beverageLog[userInput[0]];
  let result = [];

  if (!(userInput[0] in beverageLog)) return "Employee details do not exist";

  const header = "Employee ID,Beverage,Quantity,Date\n";
  const footer = "\nTotal: " + employeeLog.beverageCount + " Juices";
  const beverageInfo = employeeLog.beverageInfo;

  for (let index = 0; index < beverageInfo.length; index++) {
    const infoLine = `${employeeLog.employeeId},${beverageInfo[index].beverage},\
${beverageInfo[index].quantity},${beverageInfo[index].date}`;

    result.push(infoLine);
  }

  return header + result.join("\n") + footer;
};

exports.enquire = enquire;
