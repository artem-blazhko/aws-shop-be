import products from "../products";
import { headers } from "../constants/common-headers";

const getProductsList = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers
    }
  } catch (e) {
    console.log(e);//to see errors in CloudWatch
    return {
      statusCode: 500,
      body: e.message
    }
  }
};

export default getProductsList;
