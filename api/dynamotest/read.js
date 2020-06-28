let AWS = require('aws-sdk');
let moment = require('moment');
let _ = require('lodash');
let { v4: uuidv4 } = require('uuid');


let tablename = 'triceratops';


AWS.config.update({region: 'us-east-1', profile: 'moohh'});
let ddb = new AWS.DynamoDB();

let params = {
    TableName: tablename,
    Key: {
        'id': {S: 'aa2cc4ca-1f53-46ab-adbe-d50f2694d9bd'},
    },
    ProjectionExpression: 'id,tag,metadata,todo,createdBy,createdAt,updatedBy,updatedAt'
};

ddb.getItem(params, function(err, data) {
    if (err) {
        console.log('error', err);
    } else {
        console.log('success', data.Item);
    }
});
