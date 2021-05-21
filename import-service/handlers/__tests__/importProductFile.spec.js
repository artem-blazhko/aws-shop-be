const importProductFile = require("../importProductsFile");
const headers = require("../../constants/common-headers");
const uploadURL = "test url";

jest.mock("aws-sdk", () => ({
  S3: jest.fn(() => ({
    getSignedUrlPromise: () => uploadURL,
  })),
}));


describe("importProductFile", () => {
  it("should handle bad request", async () => {
    const event = {
      queryStringParameters: {
        name: "test.docx"
      }
    };
    const result = await importProductFile(event);
    expect(result).toEqual({
      statusCode: 400,
      body: "Incorrect data format",
      headers
    });
  });

  it("should handle 500 error", async () => {
    const result = await importProductFile();
    expect(result).toEqual(
      {
        statusCode: 500,
        body: new TypeError("Cannot read property 'queryStringParameters' of undefined"),
        headers
      }
    );
  });

  it("should handle success scenario", async () => {
    const event = {
      queryStringParameters: {
        name: "test.csv"
      }
    };
    const result = await importProductFile(event);
    expect(result).toEqual({
      statusCode: 200,
      body: uploadURL,
      headers
    });
  });
});
