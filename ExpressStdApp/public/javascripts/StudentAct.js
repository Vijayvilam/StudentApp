var app = angular.module('stdApp', []);

app.factory('studentsCRUD', function ($http, $q) {
    // var baseurl = "/ExpressStdApp";
    function getAllStudents() {
        var deferred = $q.defer();

        $http.get('/api/students').then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function addStd(newStudent) {
        var deferred = $q.defer();

        $http.post('/api/students', newStudent).then(function (result) {
            deferred.resolve(result.data.stdent);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    return {
        getAllStudents: getAllStudents,
        addStd: addStd
    };
});

app.controller('StdCtrl', function ($scope, studentsCRUD) {

    function init() {
        studentsCRUD.getAllStudents().then(function (students) {
            $scope.students = students;
        }, function (error) {
            console.log(error);
        });
    }
    $scope.addStd = function () {
        studentsCRUD.addStd({ std_name: $scope.newStudentText }).then(function (newStudent) {
            $scope.students.push(newStudent);
            $scope.newStudentText = "";
        }, function (error) {
            console.log(error);
        });
    };
    init();
});