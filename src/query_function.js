const getEmployeeLog = require("./juice_utils.js").getEmployeeLog;
const filterDesiredLog = require("./juice_utils.js").filterDesiredLog;

const enquire = function(userInput) {
  let beverageLog = JSON.parse(
    this.fs.readFileSync("./src/.beverage_details.JSON", "utf8")
  );

  const empId = userInput.id;
  const date = userInput.date;
  const beverage = userInput.beverage;

  const header = "Employee ID,Beverage,Quantity,Date";
  let footer = "Total: 0 Juices";

  if (!date && !beverage && !(empId in beverageLog))
    return [header, [], footer];

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
