import products from "../products";
import { headers } from "../constants/common-headers";

const getProductById =  async (event) => {
  try {
    const productId = Number(event?.pathParameters?.productId);
    const foundProduct = products.find(product => product.id === productId);
    if (foundProduct) {
      return {
        statusCode: 200,
        body: JSON.stringify(foundProduct),
        headers
      }
    } else {
      return {
        statusCode: 404,
        body: `Product with ${productId} product Id is not found. Use another product Id`,
        headers
      }
    }
  } catch(e) {
    console.log(e);//to see errors in CloudWatch
    return {
      statusCode: 500,
      body: e.message
    }
  }
};

export default getProductById;
