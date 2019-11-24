const enquire = require("./src/query_function.js").enquire;
const save = require("./src/saveTransaction_function.js").saveTransaction;

const main = function() {
  const timeStamp = { stamp: new Date(), path: "./src/.beverage_details.JSON" };
  const lookup = { "--save": save.bind(timeStamp), "--query": enquire };

  const userIn = process.argv.slice(3);
  console.log(lookup[process.argv[2]](userIn));
};

main();
