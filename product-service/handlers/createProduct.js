import { headers } from "../constants/common-headers";
import { connectDb } from "../db/connect";
import createProductQuery from "../db/queries/create-product.sql";

const createProduct = async (event) => {
  try {
    console.log("createProduct lambda event: ", event);

    const newProduct = JSON.parse(event.body);
    const { title, description, price, count } = newProduct;
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof +price !== "number" ||
      typeof +count !== "number" ||
      Number.isNaN(+price) ||
      Number.isNaN(+count)
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bad request. Product is not added." }),
        headers
      }
    }

    const client = await connectDb();
    const dbResponse = await client.query(createProductQuery, [title, description, price, count]);
    const { product_id } =  dbResponse.rows[0];
    client.end();

    console.log("Product successfully added to DB with id ", product_id);

    return {
      statusCode: 200,
      body: JSON.stringify({ ...dbResponse.rows[0] }),
      headers
    };
  } catch (e) {
    console.log("DataBase or server error");

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error during adding product"
      }),
      headers
    };
  }
};

export default createProduct;
