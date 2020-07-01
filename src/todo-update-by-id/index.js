let AWS = require("aws-sdk");
let moment = require("moment");

let tablename = "todo";

let ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = function (event, context, callback) {
  let body = JSON.parse(event.body);

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
      let { Item } = d;

      let updateParams = {
        TableName: tablename,
        Key: {
          id: { S: event.pathParameters.id },
        },
        UpdateExpression: "set #t = :t, #tg = :tg, #uB = :uB, #uD = :uD",
        ExpressionAttributeNames: {
          "#t": "todo",
          "#tg": "tag",
          "#uB": "updatedBy",
          "#uD": "updatedAt",
        },
        ExpressionAttributeValues: {
          ":t": {
            M: {
              name: { S: body && body.name ? body.name : Item.todo.M.name.S },
              summary: {
                S: body && body.summary ? body.summary : Item.todo.M.summary.S,
              },
              dueDate: {
                S: body && body.dueDate ? body.dueDate : Item.todo.M.dueDate.S,
              },
              done: {
                BOOL:
                  body && (body.done === "false" || body.done === "true")
                    ? body.done === "true"
                      ? true
                      : false
                    : Item.todo.M.done.BOOL,
              },
            },
          },
          ":tg": { S: body && body.tag ? body.tag : Item.tag.S },
          ":uB": { S: "unknown" },
          ":uD": { S: moment().format() },
        },
        ReturnValues: "UPDATED_NEW",
      };

      ddb.updateItem(updateParams, (e, d1) => {
        if (!e) {
          let response = {
            statusCode: 200,
            body: JSON.stringify(d1),
            isBase64Encoded: false,
          };
          callback(null, response);
        } else {
          callback(e);
        }
      });
    } else {
      callback(e);
    }
  });
};
