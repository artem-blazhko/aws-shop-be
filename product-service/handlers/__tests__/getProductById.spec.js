import products from "../../products";
import getProductById from "../getProductById";

describe("getProductById", () => {
  it("should return correct data", async () => {
    const event = {
      pathParameters: {
        productId: 1
      }
    };
    expect(await getProductById(event)).toEqual({
      statusCode: 200,
      body: JSON.stringify(products.find(product => product.id === event.pathParameters.productId)),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });
  });

  it("should return appropriate message if product is not found", async () => {
    const event = {
      pathParameters: {
        productId: 55
      }
    };
    expect(await getProductById(event)).toEqual({
      statusCode: 404,
      body: `Product with ${event.pathParameters.productId} product Id is not found. Use another product Id`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });
  });

  it("should correctly handle any error", async () => {
    const event = {
      pathParameters: {
        productId: 1
      }
    };
    const error = "error";
    JSON.stringify = jest.fn(() => throw new Error(error));
    expect(await getProductById(event)).toEqual({
      statusCode: 500,
      body: error
    });
  })
});
