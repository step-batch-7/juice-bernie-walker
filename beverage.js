const fs = require("fs");
const enquire = require("./src/query_function.js").enquire;
const save = require("./src/saveTransaction_function.js").saveTransaction;
const validatorAndFormatter = require("./src/input_validator_and_formatter.js")
  .validatorAndFormatter;
const errorMessage = require("./src/error_message.js").errorMessage;
const getPrintableOutput = require("./src/juice_utils.js").getPrintableOutput;

const main = function() {
  const stampAndPath = { stamp: new Date(), fs: fs };
  const lookup = {
    "--save": save.bind(stampAndPath),
    "--query": enquire.bind(stampAndPath),
    error: errorMessage
  };

  const userInput = process.argv.slice(2);
  const formattedInput = validatorAndFormatter(userInput);
  const outputFormat = lookup[formattedInput[0]](formattedInput[1]);
  console.log(getPrintableOutput(outputFormat));
};

main();
