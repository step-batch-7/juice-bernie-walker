const fs = require("fs");

let beverageLog = fs.readFileSync("./src/beverage_details.JSON", "utf8");
beverageLog = JSON.parse(beverageLog);

const enquire = function(userInput) {
  const empLog = beverageLog[userInput[1]];
  let result = [];

  if (empLog == undefined) {
    return "";
  }

  const header = "Employee ID, Beverage, Quantity, Date\n";
  const footer = "\nTotal: " + empLog.beverageCount + " Juices";

  for (let index = 0; index < empLog.beverageInfo.length; index++) {
    let entry = Object.values(empLog.beverageInfo[index]);
    entry.unshift(empLog.empId);
    result.push(entry);
  }

  return header + result.join("\n") + footer;
};

exports.enquire = enquire;
