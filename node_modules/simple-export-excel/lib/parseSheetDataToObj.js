module.exports = (headers, sheetdata) =>
{
    var conf = {};
    conf.cols = [];
    conf.rows = [];
    conf.cols = headers.map( hd => {
        return {
            caption:hd,
            type:'string'                    
        }
    })

    sheetdata.forEach( entry =>{

        var row = [];
        Object.keys(entry).forEach( k=>{
            if(typeof entry[k] === 'undefined'){
                row.push('');
            }else if(Array.isArray(entry[k])){
                row.push(entry[k].join(';'));
            }else{
                row.push(entry[k]);
            }
        })
        conf.rows.push(row); 
    })

    return conf;
}