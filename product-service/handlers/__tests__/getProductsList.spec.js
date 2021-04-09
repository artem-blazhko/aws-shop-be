import products from "../../products";
import getProductsList from "../getProductsList";

describe("getProductsList", () => {
  it("should return correct data", async () => {
    expect(await getProductsList()).toEqual({
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      }
    });
  });

  it("should correctly handle any error", async () => {
    const error = "error";
    JSON.stringify = jest.fn(() => throw new Error(error));
    expect(await getProductsList()).toEqual({
      statusCode: 500,
      body: error
    });
  })
});
