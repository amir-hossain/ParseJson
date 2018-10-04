
var flattenObject = function(obj){
    let flattenKeys = {};
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        
        if( Array.isArray( obj[i]) && obj[i].every( e => typeof e !== 'object')){
            flattenKeys[i] = obj[i].join(';');
        }
        else if ((typeof obj[i]) == 'object') {
 
            let flatObject = flattenObject(obj[i]);
            for (let j in flatObject) {
                if (!flatObject.hasOwnProperty(j)) continue;

                var reg = /(\d+)\./
                var matched = j.match(reg)
                if(matched){
                    _j = j.replace(reg, `[${matched[1]}].`)
                    flattenKeys[i + _j] = flatObject[j];

                }else{

                    flattenKeys[i + '.' + j] = flatObject[j];
                }
            }
        } else {
            flattenKeys[i] = obj[i];
        }
    }
    return flattenKeys;
}

module.exports = flattenObject