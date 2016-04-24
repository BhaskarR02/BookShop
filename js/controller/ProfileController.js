var _getLoggedInUser = require('./LoginController');
var _getUser = require('../loginCredential');
var _getBooks = require('../bookjson');
var _googleMapsLoader = require('google-maps');
module.exports = {
    initProfileController: function(appModule) {
        console.log('Method Executing :ProfileController.initProfileController');
        appModule.controller('ProfileController', ['$scope', 'MySharedService', 'CustomMessageService', '$timeout',
            '$mdSidenav', '$log',
            function($scope, MySharedService, CustomMessageService, $timeout, $mdSidenav, $log) {
                var _isUserLogged = MySharedService.loggedIn;
                $scope.showSaveButton = false;
                $scope.userBook = [];
                $scope.toggleRight = buildToggler('right');
                $scope.isOpenRight = function() {
                    return $mdSidenav('right').isOpen();
                };

                $scope.populateProfile = function() {

                    var _getUserId = MySharedService.userId;
                    var _getUserName = MySharedService.userName;
                    var _getUserInfo = _getUser.users.filter(function(user) {
                        return user.userName === _getUserName && user.userId === _getUserId;
                    });
                    $scope.profile_name = _getUserInfo[0].name;
                    $scope.profile_addr_1 = _getUserInfo[0].addr_1;
                    $scope.profile_addr_2 = _getUserInfo[0].addr_2;
                    $scope.profile_city = _getUserInfo[0].city;
                    $scope.profile_zipCode = _getUserInfo[0].zipCode;
                    $scope.profile_state = _getUserInfo[0].state;
                    $scope.profile_country = _getUserInfo[0].country;

                    var _address = $scope.profile_addr_1 + ' ' + $scope.profile_addr_2 + '' + $scope.profile_city + ' ' + $scope.profile_zipCode +
                        ' ' + $scope.profile_state + ' ' + $scope.profile_country;

                    var _bookData = _getBooks.jsonData();
                    for (var i = 0; i < _getUserInfo[0].items.length; i++) {
                        var _tempArray = _bookData.filter(function(item) {
                            return item.id === _getUserInfo[0].items[i];
                        });
                        $scope.userBook.push({
                            "name": _tempArray[0].name,
                            "author": _tempArray[0].author,
                            "price": _tempArray[0].price,
                            "coverpic": _tempArray[0].coverpic
                        });
                    }

                    module.exports._populateMap(_address);

                };

                /* When user navigate in from home page ---- 1*/
                module.exports._showProfile($scope, _isUserLogged, CustomMessageService);
                /* --- 1 End Here ---*/

                /* When user log in from other page ------ 2*/
                $scope.$on('successfulLogIn', function() {
                    var _loggedUser = MySharedService.loggedIn;
                    module.exports._showProfile($scope, _loggedUser, CustomMessageService);
                });
                /* ---2 End Here ---*/

                $scope.editProfile = function($event) {
                    console.log("Method Executing:ProfileController.editProfile");
                    $('.profFields input').each(function() {
                        $(this).attr('disabled', false);
                    });
                    $scope.showSaveButton = true;

                };

                $scope.saveEdit = function($event) {
                    console.log("Method Executing:ProfileController.saveEdit");
                    $scope.showSaveButton = false;
                    $('.profFields input').each(function() {
                        $(this).attr('disabled', true);
                    });
                };

                $scope.cancelEdit = function($event) {
                    console.log("Method Executing:ProfileController.cancelEdit");
                    $scope.showSaveButton = false;
                    $('.profFields input').each(function() {
                        $(this).attr('disabled', true);
                    });
                };


                function buildToggler(navID) {
                    return function() {
                        // Component lookup should always be available since we are not using `ng-if`
                        $mdSidenav(navID)
                            .toggle()
                            .then(function() {
                                $log.debug("toggle " + navID + " is done");
                            });
                    };
                }
                $scope.close = function() {
                    // Component lookup should always be available since we are not using `ng-if`
                    $mdSidenav('right').close()
                        .then(function() {
                            $log.debug("close LEFT is done");
                        });
                };


            }
        ]);


    },
    _showProfile: function($scope, isUserLogged, CustomMessageService) {
        console.log('Method Executing :ProfileController._showProfile');
        if (isUserLogged === true) {
            $scope.showProfile = true;
            $scope.populateProfile();
        } else {
            $scope.showProfile = false;
            CustomMessageService.customMessage = "Please login to edit your profile";
        }
    },

    /*Use to load google map*/
    _populateMap: function(addressString) {
            console.log('Method Executing :ProfileController._populateMap');
            /**/
            _googleMapsLoader.load(function(google) {

                var geocoder = new google.maps.Geocoder();
                var address = addressString;

                geocoder.geocode({
                    'address': address
                }, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();

                        var mapProp = {
                            center: new google.maps.LatLng(latitude, longitude),
                            zoom: 10,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        var map = new google.maps.Map(document.getElementById("mapSpace"), mapProp);
                    }
                });
            });
        } // End of _populateMap

};