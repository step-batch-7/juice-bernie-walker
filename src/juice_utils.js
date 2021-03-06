exports.loadContent = function(fileSystem, path) {
  let content = [];
  if (fileSystem.existsSync(path)) {
    content = JSON.parse(fileSystem.readFileSync(path, "utf8"));
  }
  return content;
};

exports.getPrintableOutput = function(printContent) {
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

exports.filterDesiredLog = function(arrayOfEntries, date, beverage) {
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

exports.getEmployeeLog = function(record, id) {
  let requiredRecord = [];
  for (employeeLog of record) {
    const newId = id || employeeLog.employeeId;
    if (newId == employeeLog.employeeId) {
      requiredRecord = requiredRecord.concat(employeeLog);
    }
  }
  return requiredRecord;
};

exports.areDatesEqual = areDatesEqual;
