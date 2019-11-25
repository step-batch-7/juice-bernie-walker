const fs = require("fs");

const enquire = function(userInput) {
  let beverageLog = JSON.parse(fs.readFileSync(this.readPath, "utf8"));

  const employeeId = userInput[0];
  const employeeLog = beverageLog[employeeId];
  let result = [];

  if (!employeeLog) {
    return "Employee details do not exist";
  }

  const header = "Employee ID,Beverage,Quantity,Date\n";
  const footer = "\nTotal: " + employeeLog.beverageCount + " Juices";
  const beverageInfo = employeeLog.beverageInfo;

  for (let index = 0; index < beverageInfo.length; index++) {
    const infoLine = `${employeeId},${beverageInfo[index].beverage},\
${beverageInfo[index].quantity},${beverageInfo[index].date}`;

    result.push(infoLine);
  }

  return header + result.join("\n") + footer;
};

exports.enquire = enquire;
