import { headers } from "../constants/common-headers";
import { connectDb } from "../db/connect";
import getProductByIdQuery from "../db/queries/get-product-by-id.sql";

const getProductById =  async (event) => {
  console.log("getProductById lambda event: ", event);

  try {
    const client = await connectDb();
    const productId = event.pathParameters.productId;
    const { rows } = await client.query(getProductByIdQuery, [productId]);
    client.end();

    if (rows[0]) {
      console.log("Found product: ", rows[0]);

      return {
        statusCode: 200,
        body: JSON.stringify({ product: rows[0] }),
        headers
      }
    } else {
      console.log("Incorrect productId: ", productId);

      return {
        statusCode: 404,
        body: `Product with ${productId} product Id is not found. Use another product Id`,
        headers
      }
    }
  } catch(e) {
    console.log("Error: ", e);

    return {
      statusCode: 500,
      body: e.message
    }
  }
};

export default getProductById;
