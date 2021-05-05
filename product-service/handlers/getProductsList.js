import { headers } from "../constants/common-headers";
import { connectDb } from "../db/connect";
import getProductsQuery from "../db/queries/get-products.sql";

const getProductsList = async (event) => {
  console.log("getProductsList lambda event: ", event);

  try {
    const client = await connectDb();
    const { rows } = await client.query(getProductsQuery);
    client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ products: rows }),
      headers
    }
  } catch (e) {
    console.log("Error: ", e);

    return {
      statusCode: 500,
      body: e.message,
      headers
    }
  }
};

export default getProductsList;
