const updateExisting = function(record, insertionId, insertionInfo) {
  insertionInfo.employeeId = insertionId;
  record[insertionId].push(insertionInfo);
};

const insertNew = function(record, insertionId, insertionInfo) {
  insertionInfo.employeeId = insertionId;
  record[insertionId] = [insertionInfo];
};

const recordModifier = function(recordToModify, modifyId, recordEntry) {
  let modifier = updateExisting;
  if (!(modifyId in recordToModify)) modifier = insertNew;
  modifier(recordToModify, modifyId, recordEntry);
};

exports.recordModifier = recordModifier;
