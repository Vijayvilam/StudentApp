var app = angular.module('stdApp', []);

app.factory('studentsCRUD', function ($http, $q) {
     var baseurl = "/StudentApp";
    function getAllStudents() {
        var deferred = $q.defer();

        $http.get(baseurl+'/api/students').then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function addStd(newStudent) {
        var deferred = $q.defer();

        $http.post(baseurl+'/api/students', newStudent).then(function (result) {
            deferred.resolve(result.data.student);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    function searchStudentID(studentSearchdetail) {
        var deferred = $q.defer();
        $http.get(baseurl+'/api/students/search/'+studentSearchdetail.std_id).then(function (result) {
            deferred.resolve(result.data);
            console.log(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    function searchStudentName(studentSearchdetail) {
        var deferred = $q.defer();

        $http.get(baseurl+'/api/students/search/name/'+studentSearchdetail.std_id+'/'+studentSearchdetail.std_name).then(function (result) {
            deferred.resolve(result.data);
            console.log(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    function searchStudentCourse(studentSearchdetail) {
        var deferred = $q.defer();

        $http.get(baseurl + '/api/students/search/course/' + studentSearchdetail.std_college + '/' + studentSearchdetail.std_course + '/' + studentSearchdetail.std_year).then(function (result) {
            deferred.resolve(result.data);
            console.log(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    function modifyStudent(modifyStudentdetail) {
        var deferred = $q.defer();
        $http.put(baseurl+'/api/students/update/'+modifyStudentdetail._id, modifyStudentdetail).then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function deleteStudent(deleteStudentdetail) {
        var deferred = $q.defer();
        $http.delete(baseurl+'/api/students/delete/'+deleteStudentdetail._id).then(function (result) {
           deferred.resolve(result.data);           
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    return {
        getAllStudents: getAllStudents,
        addStd: addStd,
        searchStudentName: searchStudentName,
        searchStudentID: searchStudentID,
        searchStudentCourse: searchStudentCourse,
        deleteStudent: deleteStudent,
        modifyStudent: modifyStudent
    };
});

app.controller('StdCtrl', function ($scope, $filter,studentsCRUD) {
    var studentSearch;    
    $scope.Studentsearchname = "";
    $scope.Studentsearchid = "";
    //$scope.studentArray = [];
    $scope.Campus = ["SRMU","EEC"];
    $scope.Courses = ["B.Tech","MCA","MBA","Science&Humanities"];
    $scope.Departments = ["ECE","CSE","Mechanical","Automobible","Civil","Arts&Science"];
    $scope.Year = ["2018-2019", "2017-2018", "2016-2017", "2015-2016"];
    $scope.Amount = ["10000","20000","25000",];
    function init() {
        studentsCRUD.getAllStudents().then(function (students) {
            $scope.students = students;
        }, function (error) {
            console.log(error);
        });
    }

   
    $scope.addStd = function () {
        var course = $scope.selectedCourse+","+$scope.selectedDepartment;
        
    //    studentsCRUD.addStd({ std_name : $scope.newStudentText, std_id : "1111"}).then(function (newStudent) {        
        studentsCRUD.addStd({
            std_name: $scope.newStudentName, std_id: $scope.newStudentId,
            std_course: course, std_year: $scope.selectedYear,
            std_college: $scope.selectedCampus, Datepaid_vac: $scope.DatePaidVAC,
            Amt : $scope.selectedAmount}).then(function (newStudent) {
          $scope.students.push(newStudent);
       //studentsCRUD.addStd({ std_data : $scope.newstudenthidden }).then(function (newStudent) {
       //     $scope.students.push(newStudent);
                $scope.newStudentName = "";
                $scope.newStudentId = "";
        }, function (error) {
            console.log(error);
        });
    };
    $scope.searchStd = function () {
        if ($scope.Studentsearchname == ""  ) {

            $scope.studentSearch = ({ std_id: $scope.Studentsearchid });
            studentsCRUD.searchStudentID($scope.studentSearch).then(function (result) {
                $scope.Studentsearchname = "";
                $scope.Studentsearchid = "";
                if (result.length > 0)
                    $scope.students = result;
                else {
                    $scope.students = "";
                }
            }, function (error) {
                console.log(error);
            });
        }
        else  {      
   
        $scope.studentSearch = ({ std_id: $scope.Studentsearchid, std_name: $scope.Studentsearchname });
        studentsCRUD.searchStudentName($scope.studentSearch).then(function (result) {                
                $scope.Studentsearchname = "";
                $scope.Studentsearchid = "";
                   if (result.length >0 )
                    $scope.students = result;
                   else {
                       $scope.students = "";
                   }
            }, function (error) {
                console.log(error);
                });
        }
    };
    $scope.searchStudentCourse = function () {
        $scope.studentSearchCourse = ({ std_college: $scope.StudentsearchCollege, std_course: $scope.StudentsearchCourse, std_year: $scope.StudentsearchYear });
        studentsCRUD.searchStudentCourse($scope.studentSearchCourse).then(function (result) {
            //$scope.Studentsearchname = "";
            // $scope.Studentsearchid = "";
            if (result.length > 0)
                $scope.students = result;
            else {
                $scope.students = "";
            }
        }, function (error) {
            console.log(error);
        });
    }
    $scope.delete = function (index) {
        var deletedetails = { _id : $scope.students[index]._id };
        studentsCRUD.deleteStudent(deletedetails).then(function (result) {           
         }, function (error) {
            console.log(error);
            });
        $scope.students.splice(index, 1);
    };

    $scope.SearchCourse1 = function () {
        $scope.StudentsearchCollege = "SRMU";
        $scope.StudentsearchCourse = "B.Tech,CSE";
        $scope.StudentsearchYear = "2018-2019";
        $scope.searchStudentCourse();
    }
    $scope.SearchCourse2 = function () {
        $scope.StudentsearchCollege = "EEC";
        $scope.StudentsearchCourse = "B.Tech,ECE";
        $scope.StudentsearchYear = "2018-2019";
        $scope.searchStudentCourse();
    }

    
    $scope.edited = -1;
    $scope.editedModel = {
        "_id":"",
        "std_id": "",
        "std_name": "",
        "std_course": "",
        "std_year": "",
        "std_college": "",
        "Datepaid_vac": Date,
        "Amt":""
    };

    $scope.edit = function (index) {
        $scope.edited = index;
        $scope.editedModel._id = $scope.students[index]._id;
        $scope.editedModel.std_id = $scope.students[index].std_id;
        $scope.editedModel.std_name = $scope.students[index].std_name;
        $scope.editedModel.std_course = $scope.students[index].std_course;
        $scope.editedModel.std_year = $scope.students[index].std_year;
        $scope.editedModel.std_college= $scope.students[index].std_college;
        $scope.editedModel.Datepaid_vac = $filter('date')(new Date($scope.students[index].Datepaid_vac, 'fullDate'));
        $scope.editedModel.Amt = $scope.students[index].Amt;
    };

    $scope.finishEdit = function (index) {
        $scope.students[index] = $scope.editedModel;
        studentsCRUD.modifyStudent($scope.students[index]).then(function (result) {
        }, function (error) {
            console.log(error);
        });
    
        $scope.edited = -1;
    };
    init();
});
function jsoninput() {
    /* var data = document.getElementById('newstudent').value;
     var obj = JSON.parse(data);
     var pretty = JSON.stringify(obj, undefined, 4);
     document.getElementById('newstudenthidden').value = pretty;*/
    angular.element(document.getElementById('controller')).scope().pushInArray();
}
