const areDatesEqual = function(date1String, date2String) {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);
  const yearEqual = date1.getFullYear() == date2.getFullYear();
  const monthEqual = date1.getMonth() == date2.getMonth();
  const dateEqual = date1.getDate() == date2.getDate();

  return yearEqual && monthEqual && dateEqual;
};

const filterDesiredLog = function(arrayOfEntries, date) {
  let result = [];
  let beverageCount = 0;

  for (entry of arrayOfEntries) {
    const newDate = date || entry.date;

    if (areDatesEqual(newDate, entry.date)) {
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
