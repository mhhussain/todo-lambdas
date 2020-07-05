URL = https://v203h59a2e.execute-api.us-east-1.amazonaws.com
STAGE = v1
ID = 75654739-f2e7-4957-8e72-83abb88926e0

########################################################################################
###
### GET
### Get all todos
###
########################################################################################
curl -X GET $URL/$STAGE/todo


########################################################################################
###
### POST
### Create new todo
### Body:
###  name - {string} - Name of new todo item
###  tag - {string} - Tag for todo item
###  summary - {string} - Summary of todo item
########################################################################################
curl -X POST -H 'Content-type: application/json' -d '{"name":"Test curl commands","tag":"xby2do","summary":"Create a basic test script with curl commands"}' $URL/$STAGE/todo


########################################################################################
###
### GET
###  Get todo based on ID in route
### Route:
###  id - {string} - Guid of todo item
########################################################################################
curl -X GET $URL/$STAGE/todo/$ID


########################################################################################
###
### PUT
### Create new todo
### Body:
###  name - {string} - Name of new todo item
###  tag - {string} - Tag for todo item
###  summary - {string} - Summary of todo item
###  dueDate - {string} - Due date for todo item
###  done - {string} - Mark todo as 'done'. Values "true" or "false" only
########################################################################################
curl -X PUT -H 'Content-type: application/json' -d '{"dueDate":"2020-07-08","done":"true"}' $URL/$STAGE/todo/$ID
