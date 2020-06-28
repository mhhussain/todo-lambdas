let AWS = require('aws-sdk');
let moment = require('moment');
let { v4: uuidv4 } = require('uuid');

let tablename = 'triceratops';

let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = function(event, context, callback) {
    let params = {
        TableName: tablename,
        Item: {
            'id': {S: uuidv4()},
            'tag': {S: event.tag},
            'metadata': {M: {}},
            'todo': {M: { 'name': {S: event.name}, 'summary': {S: event.summary}, 'dueDate': {S: ''}, 'done': {BOOL: false} }},
            'createdBy': {S: 'unknown'},
            'createdAt': {S: moment.now().toString()},
            'updateBy': {S: 'unknown'},
            'updatedAt': {S: moment.now().toString()},
        }
    };

    ddb.putItem(params, (e, d) => {
        if (!e) {
            callback(null, d);
        } else {
            callback(e);
        }
    });
};
