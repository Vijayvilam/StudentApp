
var json2csv = require('json2csv').parse;
var fs = require('fs');
exports.get = function (req, res) {
    var json = [
        {
            "std_name": "Suresh",
            "std_id": 400001,
            "std_colleg": "SRMU",
            "std_course": "B.TEch,ECE",
            "Datepaid_vac": Date,
            "Amount" : "10000"

        }
    ];
    var fieldsh = ['std_name', 'std_id', 'std_college', 'std_course', 'Datepaid_vac', 'Amount'];
    var csv = json2csv({ data: 'Suresh,400001,SRMU,B.Tech,ECE,12-Jun-2017,10000', fields: fieldsh });

    res.set("Content-Disposition", "attachment;filename=students.csv");
    res.set("Content-Type", "application/octet-stream");

    res.send(csv);

};