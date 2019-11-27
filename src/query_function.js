const areDatesEqual = function(logDate, userDate) {
  const ld = logDate.match(/[^a-z]+/i)[0];
  return ld == userDate;
};

const enquire = function(userInput) {
  let beverageLog = JSON.parse(
    this.fs.readFileSync("./src/.beverage_details.JSON", "utf8")
  );

  const empId = userInput.id;
  const date = userInput.date;

  let employeeLog = beverageLog[empId];
  let dateCheckStatement = true;
  let beverageCount = 0;
  let result = [];

  if (date == undefined && (empId == undefined || employeeLog == undefined))
    return "Employee details do not exist";

  if (empId == undefined) {
    employeeLog = Object.values(beverageLog).reduce(
      (result, array) => result.concat(array),
      []
    );
  }

  for (let index = 0; index < employeeLog.length; index++) {
    if (date != undefined)
      dateCheckStatement = true && areDatesEqual(employeeLog[index].date, date);

    const infoLine = `${employeeLog[index].employeeId},${employeeLog[index].beverage},\
${employeeLog[index].quantity},${employeeLog[index].date}`;

    if (dateCheckStatement) {
      beverageCount = beverageCount + employeeLog[index].quantity;
      result.push(infoLine);
    }
  }

  if (result.length == 0) return "Employee details do not exist";

  const header = "Employee ID,Beverage,Quantity,Date\n";
  const footer = "\nTotal: " + beverageCount + " Juices";

  return header + result.join("\n") + footer;
};

exports.enquire = enquire;
