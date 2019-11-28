const getEmployeeLog = require("./juice_utils.js").getEmployeeLog;
const filterDesiredLog = require("./juice_utils.js").filterDesiredLog;

const enquire = function(userInput) {
  let beverageLog = JSON.parse(
    this.fs.readFileSync("./src/.beverage_details.JSON", "utf8")
  );

  const empId = userInput.id;
  const date = userInput.date;

  if (!date && !(empId in beverageLog)) return "Employee details do not exist";

  const employeeLog = getEmployeeLog(beverageLog, empId);
  const { result, beverageCount } = filterDesiredLog(employeeLog, date);

  if (result.length == 0) return "Employee details do not exist";

  const header = "Employee ID,Beverage,Quantity,Date\n";
  const footer = "\nTotal: " + beverageCount + " Juices";

  return header + result.join("\n") + footer;
};

exports.enquire = enquire;
