const products = require("../products/index");

module.exports = async (event) => {
  try {
    const id = Number(event.path.replace("/products/", ""));
    const foundProduct = products.find(product => product.id === id);
    if (foundProduct) {
      return {
        statusCode: 200,
        body: JSON.stringify(foundProduct)
      }
    } else {
      return {
        statusCode: 404,
        body: "Product is not found. Use another product Id"
      }
    }
  } catch(e) {
    console.log(e);//to see errors in CloudWatch
    return {
      statusCode: 500,
      body: `Error: ${e}`
    }
  }

};
