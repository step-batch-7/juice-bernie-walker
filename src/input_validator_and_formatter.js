const saveValidatorAndFormatter = function(inputToCheck) {
  const idIndex = inputToCheck.lastIndexOf("--empId") + 1;
  const bevIndex = inputToCheck.lastIndexOf("--beverage") + 1;
  const qtyIndex = inputToCheck.lastIndexOf("--qty") + 1;

  const id = inputToCheck[idIndex];
  const beverage = inputToCheck[bevIndex];
  const quantity = inputToCheck[qtyIndex];

  const check1 = idIndex * bevIndex * qtyIndex != 0;
  const check2 = Number.isInteger(+id);
  const check3 = Number.isInteger(+quantity);

  if (inputToCheck.length == 6 && check1 && check2 && check3)
    return ["--save", { id: id, type: beverage, qty: quantity }];

  return ["error", {}];
};

const queryValidatorAndFormatter = function(inputToCheck) {
  if (inputToCheck.length == 2 && inputToCheck[0] == "--empId")
    return ["--query", { id: inputToCheck[1] }];

  return ["error", {}];
};

const validatorAndFormatter = function(userInput) {
  const functionLookup = {
    "--query": queryValidatorAndFormatter,
    "--save": saveValidatorAndFormatter
  };

  if (userInput[0] in functionLookup)
    return functionLookup[userInput[0]](userInput.slice(1));

  return ["error", {}];
};

exports.validatorAndFormatter = validatorAndFormatter;
