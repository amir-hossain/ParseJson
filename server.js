var http = require('http');
var xls = require('simple-export-excel');
const loadJsonFile = require('load-json-file');

function readJsonFile() {
    loadJsonFile('data.json').then(json => {

        createExcell(json);
        //=> {foo: true}
    });
}

function createHeaders(){
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

    for(let i=0;i<92;i++){
        headers.push(headersData);
    }

    // console.log(stringSortedDate.length);

    return headers;
}

function createExcell(data) {
    // console.log(data);
    var headers =createHeaders();
        // [
        //     [
        //         "ID", "Mood","Time","Activity"
        //     ],
        //     [
        //         "ID", "Mood","Time","Activity"
        //     ]
        // ]

//     var headers = 
// [
//     [
//         "ID", "Mood"
//     ]
// ]

    // console.log(data.length);

    var ret = xls.exportXls(headers, data);
    console.log(data);
    var fs = require('fs');
    fs.writeFileSync('./test.xlsx', ret, 'binary')
}

function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plane' });
    response.write('Hello world');
    // createExcell();
    readJsonFile();
    response.end();
}

http.createServer(onRequest).listen(9000);