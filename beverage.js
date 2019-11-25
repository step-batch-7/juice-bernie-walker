const enquire = require("./src/query_function.js").enquire;
const save = require("./src/saveTransaction_function.js").saveTransaction;
const validatorAndFormatter = require("./src/input_validtor_and_formatter.js")
  .validatorAndFormatter;
const errorMessage = require("./src/error_message.js").errorMessage;

const main = function() {
  const stampAndPath = {
    stamp: new Date(),
    path: "./src/.beverage_details.JSON"
  };
  const lookup = {
    "--save": save.bind(stampAndPath),
    "--query": enquire,
    error: errorMessage
  };

  const userInput = process.argv.slice(2);
  const formattedInput = validatorAndFormatter(userInput);
  console.log(lookup[formattedInput[0]](formattedInput[1]));
};

main();
