const getDataStorePath = env =>
  env.JUICE_DATA_ACCESS_PATH || "./.data/beverage_details.JSON";

const timeStamp = env => {
  const stubbedDate = new Date(env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  return hasValidStubbedDate ? stubbedDate : new Date();
};

module.exports = { getDataStorePath, timeStamp };
