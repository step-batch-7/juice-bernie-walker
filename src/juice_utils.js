const getPrintableOutput = function(printContent) {
  const body = printContent[1].map(
    object =>
      `${object.employeeId},${object.beverage},${object.quantity},${object.date}`
  );

  return [printContent[0], body.join("\n"), printContent[2]].join("\n");
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

exports.filterDesiredLog = filterDesiredLog;
exports.getEmployeeLog = getEmployeeLog;
exports.areDatesEqual = areDatesEqual;
exports.getPrintableOutput = getPrintableOutput;
