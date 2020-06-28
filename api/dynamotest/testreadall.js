let AWS = require('aws-sdk');
let moment = require('moment');
let _ = require('lodash');
let { v4: uuidv4 } = require('uuid');

AWS.config.update({region: 'us-east-1', profile: 'moohh'});

let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

let params = {
    TableName: 'horizon',
    /*Key: {
        'id': {S: '2de8e2fd-ab35-449a-86a8-669bceedb2b3'}
    },
    ProjectionExpression: 'id,tag'*/
};

/*ddb.getItem(params, function(err, data) {
    if (err) {
        console.log('error', err);
    } else {
        console.log('success', data.Item);
    }
});*/

ddb.scan(params, (e, d) => {
    if(!e) {
        console.log('success', d.Items);
    } else {
        console.log('error', e)
    }
});
