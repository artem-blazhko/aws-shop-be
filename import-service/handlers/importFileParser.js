const AWS = require("aws-sdk");
const csv = require('csv-parser');
const { BUCKET } = require("../constants");

module.exports = async event => {
  try {
    const s3 = new AWS.S3({ region: "eu-west-1" });
    const sqs = new AWS.SQS();

    await Promise.all(event.Records.map(record => {
      const results = [];
      console.log("Record key: ", record.s3.object.key);
      const params = {
        Bucket: BUCKET,
        Key: record.s3.object.key,
      };
      const s3Stream = s3.getObject(params).createReadStream();
      s3Stream.pipe(csv()).on("data", data => results.push(data));

      const parsedParams = {
        Bucket: BUCKET,
        Key: record.s3.object.key.replace("uploaded", "parsed"),
        Body: s3Stream
      };

      return new Promise((resolve, reject) => {
        s3.upload(parsedParams, async (err, data) => {
          console.log("Results: ", results);
          await Promise.all(results.map(async product => {
            try {
              const param = {
                MessageBody: JSON.stringify(product),
                QueueUrl: process.env.SQS_URL,
              };

              console.log('SEND MESSAGE TO QUEUE', param);
              await sqs.sendMessage(param).promise();
              console.log('SUCCESSFULLY SENT');
            } catch (e) {
              console.log('FAILURE SENT', e);
            }
          }));

          s3Stream.destroy();
          if (err) { return reject(err); }
          return resolve(data);
        });
      }).then(() => {
        return new Promise((resolve, reject) => {
          s3.deleteObject(params, (err, data) => {
            if (data) return resolve(data);
            return reject(err);
          });
        })
      });
    }));

    return { statusCode: 202 }
  } catch (error) {
    return {
      statusCode: 500,
      error
    };
  }
};
