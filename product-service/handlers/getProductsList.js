const products = require("../products/index");

module.exports = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        "Access-Control-Allow-Headers": "https://d1cw0fkrv9p4ak.cloudfront.net/"
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
