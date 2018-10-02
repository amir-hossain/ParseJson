var http = require('http');
var xls = require('simple-export-excel');
const loadJsonFile = require('load-json-file');

function readJsonFile() {
    loadJsonFile('real.json').then(json => {
        console.log(json);
        // createExcell(json);
        //=> {foo: true}
    });
}

function createExcell(data) {
    console.log(data);
    var headers =
        [
            [
                "ID", "Mood","Time","Activity"
            ],
            [
                "ID", "Mood","Time","Activity"
            ]
        ]

//     var headers = 
// [
//     [
//         "ID", "Mood"
//     ]
// ]

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