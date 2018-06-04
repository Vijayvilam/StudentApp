var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/student');
var db = mongoose.connection;
var studentSchema = mongoose.Schema({
    std_name: String,
    std_id: String,
    std_course: String,
    std_year: String,
    std_college: String,
    DatePaidvac: Date,
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
    var newStudent = { std_name: request.body.std_name, std_id: "", std_course: "", std_year: "", std_college: "", Datepaid_va: "", Amt: "" };
    StudentModel.create(newStudent, function (addError, addedStudent) {
        if (addError) {
            response.send(500, { error: addError });
        }
        else {
            response.send({ success: true, Student: addedStudent });
        }
    });
};

