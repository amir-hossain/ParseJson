var flattenObject = require('./flattenObject')
var parseSheetDataToObj = require('./parseSheetDataToObj')
module.exports = (headers,data,sheetsname) => {
    if(Array.isArray( data) === false){
        throw new Error('data should be array')
    }

    if(typeof sheetsname === 'undefined'){
        sheetsname = [];
        data.forEach( (d,i)=>{
            sheetsname.push(`sheet_${i}`);
        })
    }

    if(Array.isArray( sheetsname ) === false){
        throw new Error('sheetsname should be array')
    }

    if(Array.isArray( headers) === false){
        throw new Error('headers should be array')
    }

    data = data.map( sheet => {
        return sheet.map( row => flattenObject(row))
    })

    var confs = [];
    headers.forEach( (h,i)=>{
        confs.push(parseSheetDataToObj(h,data[i]));
    })        
    
    sheetsname.forEach( (sh,i)=>{
        confs[i].name = sh.trim().replace(/\s\s+/g,' ').split(' ').join('_')
    })

    return confs
}
