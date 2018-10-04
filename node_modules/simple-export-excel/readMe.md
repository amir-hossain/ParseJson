# Simple-export-excel
Parse the json oject to excel

# Install

```sh
npm install simple-export-excel --save
```

# Usage

```js
    .exportXls(headers, data, sheetsname)
```
You have to specify headers and data, and pass them to .exortXls 
```js
var header = [
    ['item','price']
]

var data = [
    [
        {
            'item':'apple',
            'price':1000
        },
        {
            'item':'banana',
            'price':1000
        }
    ],//sheet 1
]
```
 


For example
```js
var xls = require('simple-export-excel');
var headers = 
[
    [
        "item", "price"
    ],
    [
        "name", "id"
    ]
]

var data = [
                [
                    {
                        'item':'apple',
                        'price':1000
                    },
                    {
                        'item':'banana',
                        'price':1000
                    }
                ],//sheet 1
                [
                    {
                        'name':'andy',
                        'id':112
                    },
                    {
                        'name':'bob',
                        'id':90,
                    }
                ]//sheet 2
            ]

var ret =  xls.exportXls( headers, data);
var fs = require('fs');
fs.writeFileSync('./test.xlsx',ret,'binary')
```

Output:

(sheet_0)

|item|price|
| :------------- | :--------- |
|apple|1000|
|banana|1000

(sheet_1)

|name|id|
| :------------- | :--------- |
|andy|112|
|bob|90|

Note: output will be binary data. You can use fs.writeFile to write these into a file. 

```js
var fs = require('fs');
fs.writeFileSync('./test.xlsx',ret,'binary')
```


# Notice

## case 1.
In the following case:
because we don't specify 'year' in the headers, simple-export-excel will ignore the 'year'  during the parsing process.


```js
var xls = require('simple-export-excel');
var headers = 
[
    [
        "name", "id"
    ],
 
]

var data = [

                [
                    {
                        'name':'andy',
                        'id':112
                    },
                    {
                        'name':'bob',
                        'id':90,
                        'year':'2017',
                    }
                ]//sheet 1
            ]

var ret =  xls.exportXls( headers, data);
var fs = require('fs');
fs.writeFileSync('./test.xlsx',ret,'binary')
```

the Output will be


|name|id|
| :------------- | :--------- |
|andy|112|
|bob|90|


## case 2.

As you can see, the name property of first object stores a array ['andy', 'andy lai'].

```js
var data = [

                [
                    {
                        'name':['andy','andy lai'],
                        'id':112
                    },
                    {
                        'name':'bob',
                        'id':90,
                    }
                ]//sheet 1
            ]

```

In this case, simple-export-excel will combine all element in the array with ';'.

The output will be

|name|id|
| :------------- | :--------- |
| andy; andy lai| 112|
| bob | 90 |

## case 3. Nested JSON


```js
var xls = require('simple-export-excel');
const header = 
    [
        [   //header of sheet 1 
            'item',
            'price',
            'dealership.us[0].name',
            'dealership.us[0].address',
            'dealership.us[0].prop',
            'dealership.us[1].name',
            'dealership.us[1].address',
            'dealership.us[1].prop'
        ] 
    ]
var data = 
    {
                
        'item': 'apple',
        'price': 1000,
        'dealership': {
            'us': [
                    {
                        name: 'andy',
                        address: 'street 1, no 38',
                        prop: ['car', 'house']
                    },
                    {
                        name: 'bob',
                        address: 'stree 2, no 113',
                        prop: ['stock', 'car']
                    }
            ]
        }
    }

var ret = xls.exportXls(header, data);
var fs = require('fs');
fs.writeFileSync('./test.xlsx',ret,'binary')
```

The output will be like:

|item|price|dealership.us[0].name|dealership.us[0].address|dealership.us[0].prop|dealership.us[1].name|dealership.us[1].address|dealership.us[1].prop|
|:---|:----|:--------------------|:-----------------------|:--------------------|:--------------------|:-----------------------|:--------------------|
|apple|1000|andy|street 1, no 38|car;house|bob|stree 2, no 113|stock;car|

# Release Note:

## 2.0.1
The white spaces in the sheet name will be replaced by '_'