var http = require('http');
var xls = require('simple-export-excel');
const loadJsonFile = require('load-json-file');
var Set = require("collections/set");
var writeFile = require('write');
const pointList = [];
const userList = [];
const dateList = new Set();
const stringSortedDate = [];





function createObj() {
    return {
        ID: '',
        Mood: 'ভালো',
        Time: '',
        Activity: 'বাসা',
        Location: 'None',
        Status: '',
        Points: '',
        Date: '29-7-2018',
        setID: function (id) {
            this.ID = id + '';
        },
        setMood: function (mood) {
            if (mood)
                this.Mood = mood + '';
        },
        setTime: function (time) {
            if (time)
                this.Time = time + '';
        },
        setActivity: function (activity) {
            if (activity)
                this.Activity = activity + '';
        },
        setLocation: function (location) {
            if (location) {
                this.Location = location;
            }
        },
        setPoint: function (points) {
            this.Points = points * 10 + '';

            this.setStatus(this.Points);
        },
        setStatus: function (points) {
            if (points >= 500) {
                this.Status = "Gold"
            } else if (points > 100) {
                this.Status = "Silver"
            } else {
                this.Status = "Bronze"
            }
        },
        setDate: function (date) {
            if (date)
                this.Date = date + '';
        }
    };
}

function getMainData(id, obj, keys, points) {
    let temp;
    keys.forEach(key => {
        // console.log(key);
        temp = obj[key];
        // console.log(obj[key]);

        let user = createObj();
        user.setID(id);
        user.setMood(temp.mood);
        user.setTime(temp.time);
        user.setActivity(temp.activity);
        user.setLocation(temp.location);
        user.setStatus(temp.Status);
        user.setPoint(points);
        user.setDate(temp.date);

        userList.push(user);

    })
}

function getPoints(dates) {
    return dates.length
}

function addUniqueDate(dates) {
    dates.forEach(date => {
        if (!dateList.has(date)) {
            dateList.add(date);
            // console.log("added: "+date);
        }else{
            //    console.log("discarted: "+date);
        }
    })
}

function getTempData(id, obj, dates) {
    //    console.log(obj);
    //    console.log(dates);

    let points = getPoints(dates);

    addUniqueDate(dates);

    pointList.push(points);


    let mainKeys;
    let tempData;
    //    console.log(points);
    dates.forEach(date => {
        // console.log(obj[key]);
        tempData = obj[date];
        mainKeys = Object.keys(tempData);
        // console.log(mainKey);
        getMainData(id, tempData, mainKeys, points)
    });

}

function getID(obj) {
    let temp;
    let keys;
    Object.keys(obj).forEach(function (id) {
        // obj[id].id=id;
        // temp.push(obj)
        // console.log(id);
        temp = obj[id];
        // console.log(temp);
        keys = Object.keys(temp);
        //  console.log(Object.keys(temp));
        // temp.push(obj[id]);

        getTempData(id, temp, keys);
    });


}

function strigToDate(date) {
    var temp = date.split('-');

    return new Date(temp[1] + '-' + temp[0] + '-' + temp[2])
}

function dateToString(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yy = date.getFullYear();

    return dd+'-'+mm+'-'+yy;

}

function sort(dates) {
    let sortedDate;
    let singleStringSortedDate;
    let date_sort_asc = function (date1, date2) {
        if (date1 > date2) return 1;
        if (date1 < date2) return -1;
        return 0;
    };

    sortedDate = dates.sort(date_sort_asc);
    //   console.log(sortedDate);

    sortedDate.forEach(date => {
        singleStringSortedDate=dateToString(date);
        stringSortedDate.push(singleStringSortedDate);
    })

    // console.log(stringSortedDate);
}

function sortDate(dateList) {

    let orginalDateList = [];
    let singleDate;

    dateList.forEach(date => {
        // console.log(date);
        singleDate = strigToDate(date);
        orginalDateList.push(singleDate);
    })

    // console.log(orginalDateList);
    sort(orginalDateList);
}


function groupUserByDate(users,dates){
    parrentGroup=[];
    // let userGroup=[];
    dates.forEach(date=>{
        let userGroup=[];
        users.forEach(user=>{
            if(date===user.Date){
                userGroup.push(user);
            }
        })
        parrentGroup.push(userGroup);
    })

    // console.log(parrentGroup);


    let myJSON = JSON.stringify(parrentGroup);
    // console.log(myJSON);

    writeToFile(myJSON);

}

function readJsonFile() {
    loadJsonFile('mood.json').then(json => {
        // console.log(json.mood);
        getID(json.mood);
        
        //=> {foo: true}

        // console.log(userList);
        let uniqueDateList = [];
        let date;
        dateList.forEach(date=>{
            // console.log(date);
            uniqueDateList.push(date)
        });

        sortDate(uniqueDateList);

        groupUserByDate(userList,stringSortedDate)
    });




}


function writeToFile(data){
    writeFile('data.json', data, function(err) {
        if (err) console.log(err);
      });
}


function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plane' });
    response.write('Hello world');
    readJsonFile();
    response.end();
}

http.createServer(onRequest).listen(9000);