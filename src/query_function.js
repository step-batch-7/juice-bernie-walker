const filterDesiredLog = function(arrayOfEntries, date) {
  let result = [];
  let beverageCount = 0;

  for (entry of arrayOfEntries) {
    const dateString = entry.date.match(/[^a-z]+/i);
    const newDate = date || dateString;
    if (newDate == dateString) {
      const infoLine = `${entry.employeeId},${entry.beverage},${entry.quantity},${entry.date}`;

      result.push(infoLine);
      beverageCount = beverageCount + entry.quantity;
    }
  }

  return { result, beverageCount };
};

const getEmployeeLog = function(record, id) {
  let requiredRecord = [];
  for (employee in record) {
    const newId = id || employee;
    if (newId == employee) {
      requiredRecord = requiredRecord.concat(record[newId]);
    }
  }
  return requiredRecord;
};

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
