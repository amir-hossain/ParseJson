var nodeExcel  = require('excel-export');
var toExcelConfig = require('./lib/toExcelConfig')

module.exports = {

    exportXls : function(headers,data,sheetsname){

        var confs = toExcelConfig(headers,data,sheetsname);
        return nodeExcel.execute(confs);
    }

}