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
  const idIndex = inputToCheck.lastIndexOf("--empId") + 1;
  const dateIndex = inputToCheck.lastIndexOf("--date") + 1;
  const bevIndex = inputToCheck.lastIndexOf("--beverage") + 1;

  let id = undefined;
  let date = undefined;
  let beverage = undefined;

  if (idIndex) id = inputToCheck[idIndex];
  if (dateIndex) date = inputToCheck[dateIndex];
  if (bevIndex) beverage = inputToCheck[bevIndex];

  const check1 = idIndex + dateIndex + bevIndex != 0;
  const check2 = Number.isInteger(+id) || id == undefined;
  const check3 = new Date(date).toString() != "Invalid date";

  if (
    (inputToCheck.length == 2 ||
      inputToCheck.length == 4 ||
      inputToCheck.length == 6) &&
    check1 &&
    check2 &&
    check3
  )
    return ["--query", { id: id, date: date, beverage: beverage }];

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
