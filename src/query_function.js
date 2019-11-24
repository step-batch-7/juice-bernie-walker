const fs = require("fs");

let beverageLog = fs.readFileSync("./src/beverage_details.JSON", "utf8");
beverageLog = JSON.parse(beverageLog);

const enquire = function(userInput) {
  const employeeLog = beverageLog[userInput[1]];
  let result = [];

  if (employeeLog == undefined) {
    return "Employee details do not exist";
  }

  const header = "Employee ID,Beverage,Quantity,Date\n";
  const footer = "\nTotal: " + employeeLog.beverageCount + " Juices";
  const beverageInfo = employeeLog.beverageInfo;

  for (let index = 0; index < beverageInfo.length; index++) {
    const infoLine =
      employeeLog.employeeId +
      "," +
      beverageInfo[index].beverage +
      "," +
      beverageInfo[index].quantity +
      "," +
      beverageInfo[index].date;

    result.push(infoLine);
  }

  return header + result.join("\n") + footer;
};

exports.enquire = enquire;
