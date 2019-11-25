const updateExisting = function(record, insertionId, insertionInfo) {
  record[insertionId].beverageInfo.push(insertionInfo);
  record[insertionId].beverageCount += insertionInfo.quantity;
};

const insertNew = function(record, insertionId, insertionInfo) {
  record[insertionId] = {
    beverageInfo: [insertionInfo],
    beverageCount: insertionInfo.quantity
  };
};

const recordModifier = function(recordToModify, modifyId, recordEntry) {
  const modifierLookup = { new: insertNew, exists: updateExisting };
  let lookupKey = "exists";

  if (!recordToModify[modifyId]) {
    lookupKey = "new";
  }

  const modifier = modifierLookup[lookupKey];

  modifier(recordToModify, modifyId, recordEntry);
};

exports.recordModifier = recordModifier;
