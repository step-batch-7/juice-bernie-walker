const errorMessage = function() {
  const message1 =
    "usage:-\nfor query : node beverage.js --query --empId employeeId\n";
  const message2 =
    "for save  : node beverage.js --save --(options) --(details)...{3}\n";
  const message3 = "\t    options =>    --empId,   --beverage, --qty\n";
  const message4 = "\t    details => employeeId, beverageName, quantity";
  return message1 + message2 + message3 + message4;
};

exports.errorMessage = errorMessage;
