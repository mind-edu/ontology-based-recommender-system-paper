/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angulerRouterApp.controller('regctrl', function ($scope, $http) {

// get all counties to dropdown list
    $scope.bindAllCities = function () {
        $http.get("API_getAllRegionsCounties").then(function (response) {
//        assign data to this variable
            console.log(response.data);
            $scope.citiesArray = response.data;
        });
    };




    $scope.bindClassesSubClasses = function () {
        $http.get("/Ontology/API_getedubackground").then(function (response) {
//        assign data to this variable
            console.log(response.data);
            $scope.eduArray = response.data;
        });
    };

    $scope.bindAllLanguages = function () {
        $http.get("API_getalllangs").then(function (response) {
//        assign data to this variable
            console.log(response.data);
            $scope.languagesArray = response.data;
        });
    };

    $scope.bindAlleduLevels = function () {
        $http.get("API_getCourselvl").then(function (response) {
//        assign data to this variable
            console.log(response.data);
            $scope.eduLevelArray = response.data;
        });
    };

//    

//validate user mail
    $scope.validateUserMail = function (m) {
        $scope.disableButton = false;
        $http.get("API_getUserEmail?userEmail=" + m).then(function (response) {

//            
            $scope.emailExistense = response.data[0].found;
            if ($scope.emailExistense == 1)
            {
                $scope.validationClass = "danger";
                $scope.validationMsg = "is already registered";
                $scope.disableButton = true;

            } else
            {
                $scope.validationClass = "success";
                $scope.validationMsg = "is a valid address";
            }



        });
    };


// insert profile 
    $scope.insertUserProfile = function (ufn, uln, umn, uad, ucit, uem, umo, uedb, ucq, ulang, uski, fos, cln, scln,upass,ugender,uinarea) {
        $scope.disableButton = false;
        $scope.showResponsePanel = false;

        $http.get('/Ontology/API_insertNewUser?ufn=' + ufn + '&uln=' + uln + '&umn=' + umn + '&uad=' + uad + '&ucit=' + ucit + '&uem=' + uem + '&umo=' + umo + '&uedb=' + uedb + '&ucq=' + ucq + '&ulang=' + ulang + '&uski=' + uski + '&upass='+upass+'&fos='+fos+'&cln='+cln+'&scln='+scln+'&g='+ugender+'&int='+uinarea+'').then(function (response) {

            $scope.registrationStatus = response.data;
            console.log($scope.registrationStatus[0].addingUserResponse);
        });

        if (fos !== "undefined" && cln !== "undefined" && scln !== "undefined")
        {
            $http.get("/Ontology/API_InsClassConf?careerName=" + fos + "&className=" + cln + "&subClassName=" + scln).then(function (response) {

            });
        }
     
        $scope.showResponsePanel = true;
        $scope.disableButton = true;
    };


//    

    $scope.onloadFunction = function () {
        $scope.bindClassesSubClasses();
        $scope.bindAllCities();
        $scope.bindAllLanguages();
        $scope.bindAlleduLevels();
    };


    $scope.onloadFunction();

});

