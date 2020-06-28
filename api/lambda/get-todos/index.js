let AWS = require('aws-sdk');

let tablename = 'triceratops';

let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = function(event, context, callback) {
    let params = {
        TableName: tablename,
    };
    
    ddb.scan(params, (e, d) => {
        if (!e) {
            callback(null, d);
        } else {
            callback(e);
        }
    });
};
