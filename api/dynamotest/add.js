let AWS = require('aws-sdk');
let moment = require('moment');
let _ = require('lodash');
let { v4: uuidv4 } = require('uuid');


let tablename = 'triceratops';


AWS.config.update({region: 'us-east-1', profile: 'moohh'});
let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

let params = {
    TableName: tablename,
    Item: {
        'id': {S: uuidv4()},
        'tag': {S: 'p1'},
        'metadata': {M: {}},
        'todo': {M: { 'name': {S: 'test 1'}, 'summary': {S: 'this is a test 1 xby2do'}, 'dueDate': {S: moment.now().toLocaleString()}, 'done': {BOOL: false} }},
        'createdBy': {S: 'moohh'},
        'createdAt': {S: moment.now().toLocaleString()},
        'updateBy': {S: 'moohh'},
        'updatedAt': {S: moment.now().toLocaleString()},
    }
};

ddb.putItem(params, function(err, data) {
    if (err) {
        console.log('error', err);
    } else {
        console.log('success', data)
    }
});
