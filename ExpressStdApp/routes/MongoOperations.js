var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/student');
var csv = require('fast-csv');
var db = mongoose.connection;
var studentSchema = mongoose.Schema({
    std_name: String,
    std_id: String,
    std_course: String,
    std_year: String,
    std_college: String,
    Datepaid_vac: Date,
    Amt: String
});
var StudentModel = mongoose.model('students', studentSchema);
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function () {
    console.log("student DB is open...");
});
exports.fetch = function (request, response) {
    StudentModel.find().exec(function (err, res) {
        if (err) {
            response.send(500, { error: err });
        }
        else {
            response.send(res);
        }
    });
};

exports.add = function (request, response) {
    var newStudent = { std_name: request.body.std_name, std_id: request.body.std_id, std_course: request.body.std_course, std_year: request.body.std_year, std_college: request.body.std_college, Datepaid_vac : request.body.Datepaid_vac, Amt: request.body.Amt };  //  var newStudent = request.body.std_data;
      StudentModel.create(newStudent, function (addError, addedStudent) {
        if (addError) {
            response.send(500, { error: addError });
        }
        else {
            response.send({ success: true, student : addedStudent });
        }
    });
};
exports.update = function (request, response) {
    console.log(request.params._id);
    var ObjId = { "_id": "" + request.params._id + "" };
    StudentModel.update(ObjId,
        { std_name: request.body.std_name, std_id: request.body.std_id, std_course: request.body.std_course, std_year: request.body.std_year, std_college: request.body.std_college, Amt: request.body.Datepaid_vac, Amt: request.body.Amt },
        { multi: true }, function (error, rowsAffected) {
            if (error) {
                response.send(500, { error: error });
            }
            else if (rowsAffected == 0) {
                response.send(500, { error: "No rows affected" });
            }
            else {
                response.send(200);
            }
    });
};
exports.delete = function (request, response) {    
    //console.log(request.params.std_id);
    var ObjId_del = { "_id": "" + request.params._id + "" };
    StudentModel.remove(ObjId_del, function (err,res) {
        if (err) {
            response.send(500, { error : err });
        }
        else {
            response.send(res);
        }
    });
};
exports.searchCourse = function (request, response) {    
    var SearchStudent = { "std_college": ""+request.params.std_college+"", "std_course": ""+request.params.std_course+"", "std_year": ""+request.params.std_year+"" };
   // var SearchStudent = {"std_year": ""+request.params.std_year+""};
       StudentModel.find(SearchStudent, function (err, res) {
        if (err) {
             response.send(500, { error: err });
        }
        else {
           
             response.send(res);                       
        }
    });
};
exports.searchName = function (request, response) {
    // var SearchStudent = { "std_id" : ""+request.params.std_id+"","std_name":""+request.body.std_name+"" };
    var SearchStudent = { "std_id": "" + request.params.std_id + "", "std_name": "" + request.params.std_name + "" };
    //  var newStudent = request.body.std_data;
    //StudentModel.find({ "std_id": "" + request.params.std_id + "", }, function (err, res) {
    StudentModel.find(SearchStudent, function (err, res) {
        if (err) {
            response.send(500, { error: err });
        }
        else {
            response.send(res);
        }
    });
};
exports.searchId = function (request, response) {
    // var SearchStudent = { "std_id" : ""+request.params.std_id+"","std_name":""+request.body.std_name+"" };
    var SearchStudent = { "std_id": "" + request.params.std_id +"" };
    StudentModel.find(SearchStudent, function (err, res) {
        if (err) {
            response.send(500, { error: err });
        }
        else {            
            response.send(res);
        }
    });
};



exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var studentFile = req.files.file;

    var students = [];

    csv
        .fromString(studentFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();

            students.push(data);
        })
        .on("end", function () {
            StudentModel.create(students, function (err, documents) {
                if (err) throw err;
            });

            res.send(students.length + ' students have been successfully uploaded.');
        });
};