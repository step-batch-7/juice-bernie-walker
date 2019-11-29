const getPrintableOutput = function(printContent) {
  const body = printContent[1].map(
    object =>
      `${object.employeeId},${object.beverage},${object.quantity},${object.date}`
  );

  let line = [printContent[0], body.join("\n"), printContent[2]].join("\n");

  line = line.replace(/\n\n/, "\n").replace(/\n$/, "");

  return line;
};

const areDatesEqual = function(date1String, date2String) {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);
  const yearEqual = date1.getFullYear() == date2.getFullYear();
  const monthEqual = date1.getMonth() == date2.getMonth();
  const dateEqual = date1.getDate() == date2.getDate();

  return yearEqual && monthEqual && dateEqual;
};

const filterDesiredLog = function(arrayOfEntries, date, beverage) {
  let result = [];
  let beverageCount = 0;

  for (entry of arrayOfEntries) {
    const newDate = date || entry.date;
    const newBeverage = beverage || entry.beverage;

    if (newBeverage == entry.beverage && areDatesEqual(newDate, entry.date)) {
      result.push(entry);
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

exports.filterDesiredLog = filterDesiredLog;
exports.getEmployeeLog = getEmployeeLog;
exports.areDatesEqual = areDatesEqual;
exports.getPrintableOutput = getPrintableOutput;
