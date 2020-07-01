let AWS = require("aws-sdk");

let tablename = "todo";

let ddb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
  let params = {
    TableName: tablename,
    Key: {
      id: {
        S: event.pathParameters.id,
      },
    },
    ProjectionExpression:
      "id,tag,metadata,todo,createdBy,createdAt,updatedBy,updatedAt",
  };

  ddb.getItem(params, (e, d) => {
    if (!e) {
      let response = {
        statusCode: 200,
        body: JSON.stringify(d),
        isBase64Encoded: false,
      };
      callback(null, response);
    } else {
      callback(e);
    }
  });
};
