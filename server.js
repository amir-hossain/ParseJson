var http = require('http');
var xls = require('simple-export-excel');
const loadJsonFile = require('load-json-file');

function readJsonFile() {
    loadJsonFile('data.json').then(json => {

        createExcell(json);
   
    });
}

function createHeaders(length){
    let headers=[];
    let headersData=[
    'ID',
    'Mood',
    'Time',
    'Activity',
    'Location',
    'Status',
    'Points',
    'Date'];

    for(let i=0;i<length;i++){
        headers.push(headersData);
    }

    console.log(length);

    return headers;
}

function createExcell(data) {
    // console.log(data);
    var headers =createHeaders(data.length);
   

    var ret = xls.exportXls(headers, data);
    console.log(data);
    var fs = require('fs');
    fs.writeFileSync('./test.xlsx', ret, 'binary')
}

function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plane' });
    response.write('Hello world');
    readJsonFile();
    response.end();
}

http.createServer(onRequest).listen(9000);