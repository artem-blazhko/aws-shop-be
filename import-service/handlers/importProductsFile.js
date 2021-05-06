const AWS = require("aws-sdk");
const headers = require("../constants/common-headers");
const { BUCKET } = require("../constants");

module.exports = async event => {
  try {
    const catalogName = event.queryStringParameters.name;
    if (!catalogName.endsWith(".csv")) {
      return {
        statusCode: 400,
        body: "Incorrect data format",
        headers
      }
    }
    const productsFilePath = `uploaded/${decodeURIComponent(catalogName).replace(/\+/g, " ")}`;
    const s3 = new AWS.S3({ region: "eu-west-1", signatureVersion: "v4" });
    const params = {
      Bucket: BUCKET,
      Key: productsFilePath,
      Expires: 60,
      ContentType: 'text/csv',
      ACL: "public-read"
    };
    const uploadURL = await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) { reject(err) }
        resolve(url)
      })
    });

    return {
      statusCode: 200,
      body: uploadURL,
      headers
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
      headers
    };
  }
};
