const updateExisting = function(record, insertionId, insertionInfo) {
  insertionInfo.employeeId = insertionId;
  record[insertionId].push(insertionInfo);
};

const insertNew = function(record, insertionId, insertionInfo) {
  insertionInfo.employeeId = insertionId;
  record[insertionId] = [insertionInfo];
};

const recordModifier = function(recordToModify, modifyId, recordEntry) {
  const modifierLookup = { new: insertNew, exists: updateExisting };
  let lookupKey = "exists";

  if (!(modifyId in recordToModify)) lookupKey = "new";

  const modifier = modifierLookup[lookupKey];

  modifier(recordToModify, modifyId, recordEntry);
};

exports.recordModifier = recordModifier;
