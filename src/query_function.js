const {
  getEmployeeLog,
  filterDesiredLog,
  loadContent
} = require("./juice_utils.js");

const enquire = function(userInput) {
  let beverageLog = loadContent(this.fs, this.path);

  const empId = userInput.id;
  const date = userInput.date;
  const beverage = userInput.beverage;

  const header = "Employee ID,Beverage,Quantity,Date";
  let footer = "Total: 0 Juices";

  if (!date && !beverage && !empId) return [header, [], footer];

  const employeeLog = getEmployeeLog(beverageLog, empId);
  const { result, beverageCount } = filterDesiredLog(
    employeeLog,
    date,
    beverage
  );
  footer = "Total: " + beverageCount + " Juices";

  return [header, result, footer];
};

exports.enquire = enquire;
