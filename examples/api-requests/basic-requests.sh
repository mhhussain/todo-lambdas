URL = https://
STAGE = v1
ID = aa

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
### PATCH
### Create new todo
### Body:
###  name - {string} - Name of new todo item
###  tag - {string} - Tag for todo item
###  summary - {string} - Summary of todo item
###  dueDate - {string} - Due date for todo item
###  done - {string} - Mark todo as 'done'. Values "true" or "false" only
########################################################################################
curl -X PATCH -H 'Content-type: application/json' -d '{"dueDate":"2020-07-08","done":"true"}' $URL/$STAGE/todo/$ID
