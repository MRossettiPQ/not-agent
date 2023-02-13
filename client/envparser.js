const DotEnv = require("dotenv");

module.exports = () => {
  let parsedEnv;
  if (process.env.NODE_ENV !== null) {
    parsedEnv = DotEnv.config({
      path: `./.env.${process.env.NODE_ENV}`,
    }).parsed;
  } else {
    parsedEnv = DotEnv.config({ path: `./.env` }).parsed;
  }
  for (let key in parsedEnv) {
    if (typeof parsedEnv[key] === "string") {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }
  return parsedEnv;
};
