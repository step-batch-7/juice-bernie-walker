const enquire = require("./src/query_function.js").enquire;

const main = function() {
  const userIn = process.argv.slice(2);
  console.log(enquire(userIn));
};

main();
