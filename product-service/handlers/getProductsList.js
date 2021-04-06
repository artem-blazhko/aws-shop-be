const products = require("../products/index");

module.exports = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    }
  } catch (e) {
    console.log(e);//to see errors in CloudWatch
    return {
      statusCode: 500,
      body: `Error: ${e}`
    }
  }
};
