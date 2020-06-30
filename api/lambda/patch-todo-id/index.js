let AWS = require("aws-sdk");

let tablename = "triceratops";

let ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = function (event, context, callback) {
  let body = JSON.parse(event.body);
  let params = {
    TableName: tablename,
    Key: {
      id: { S: event.pathParameters.id },
    },
    UpdateExpression: "set #t = :t",
    ExpressionAttributeNames: {
      "#t": "todo",
    },
    ExpressionAttributeValues: {
      ":t": {
        M: {
          name: { S: body.name ? body.name : "world" },
          summary: { S: body.summary ? body.summary : "world" },
          dueDate: { S: body.dueDate ? body.dueDate : "world" },
          done: { S: body.done ? body.done : "world" },
        },
      },
    },
    ReturnValues: "UPDATED_NEW",
  };

  ddb.updateItem(params, (e, d) => {
    if (!e) {
      let response = {
        statusCode: 200,
        body: JSON.stringify(event.body),
        isBase64Encoded: false,
      };
      callback(null, response);
    } else {
      callback(e);
    }
  });
};
