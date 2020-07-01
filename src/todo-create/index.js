let AWS = require("aws-sdk");
let moment = require("moment");
let { v4: uuidv4 } = require("uuid");

let tablename = "todo";

let ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = function (event, context, callback) {
  let params = {
    TableName: tablename,
    Item: {
      id: { S: uuidv4() },
      tag: { S: event.tag ? event.tag : "" },
      metadata: { M: {} },
      todo: {
        M: {
          name: { S: event.name ? event.name : "" },
          summary: { S: event.summary ? event.summary : "" },
          dueDate: { S: "" },
          done: { BOOL: false },
        },
      },
      createdBy: { S: "unknown" },
      createdAt: { S: moment().format() },
      updateBy: { S: "unknown" },
      updatedAt: { S: moment().format() },
    },
  };

  ddb.putItem(params, (e, d) => {
    if (!e) {
      callback(null, d);
    } else {
      callback(e);
    }
  });
};
