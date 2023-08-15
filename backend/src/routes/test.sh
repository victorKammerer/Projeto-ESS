curl -i -X DELETE -H 'Content-Type: application/json' http://localhost:5001/api/user/1/list/1
curl -i -X POST -H 'Content-Type: application/json' -d '{"gameId": 1, "entryType": 1, "reqDate" : "2021-05-04"}' http://localhost:5001/api/user/1/list
curl -i -X GET -H 'Content-Type: application/json' http://localhost:5001/api/user/1/list
curl -i -X PUT -H 'Content-Type: application/json' -d '{"entryType": 2, "reqDate" : "2020-03-02"}' http://localhost:5001/api/user/1/list/2
curl -i -X GET -H 'Content-Type: application/json' http://localhost:5001/api/user/1/list
