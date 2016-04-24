var _getUser = require('../loginCredential');
var _getLoggedInUser = require('./LoginController');
var _getProfile = require('./ProfileController');

//var $ = require('jquery');
module.exports = {

    initWelcomeController: function(appModule, bookData) {
        appModule.controller('WelcomeController', ['$scope', '$mdDialog', '$mdMedia', '$location', '$rootScope', '$timeout','MySharedService','BasketService',
            function($scope, $mdDialog, $mdMedia, $location, $rootScope, $timeout,MySharedService,BasketService) {
               // CustomMessageService.monitorStateChange();
                /*Show carousel only in book tab
                Checking the url. If /home/book is present return true & show carousel or else return false*/
                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){});
                $.activateLoginButton = false;
                $.activateSignInButton = true;
                
                /* If no item is selected or initial page load show basket count 0*/
                $scope.totalCount = 0;
                //Will watch basketCount.Any update will update the count
                $scope.$on('basketCount',function(){
                    $scope.totalCount = BasketService.totalCount;
                });


                $scope.showCarousel = function() {
                    var _getUrl = $location.$$path; // Will give path
                    if (_getUrl == "/home/books") {
                        return true;
                    } else {
                        return false;
                    }
                };
               $scope.showLoginButton=function(){

                       var _getUserInfo = _getLoggedInUser.isUserLogged();
                       // Show login Button ,hide signin button
                       if(_getUserInfo.userName !==undefined && _getUserInfo.userId !==undefined){
                         $scope.userWelcome = _getUserInfo.userName;
                         $scope.activateLoginButton = true;
                         $scope.activateSignInButton = false;
                         //return true;
                       }
                       else{ // show signinbutton ,hide login button
                        $scope.activateLoginButton = false;
                         $scope.activateSignInButton = true;
                       }
                }
                $scope.showLoginButton();
                module.exports._createCarousel($scope, bookData);
                $scope.signIn = function(event) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                    $mdDialog.show({
                        templateUrl: '../../html/loginform.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen,
                        controller: ShowLoginFormController})}
                $scope.logOut = function(event) {
                    $scope.userWelcome = "";
                    _getLoggedInUser._removeUserInfo();
                    $scope.showLoginButton();
                    MySharedService._isLogin(false,undefined,undefined)}

                function ShowLoginFormController($scope, $mdDialog) {
                    $scope.login = function(event) {
                        var _getUserName = $scope.login.userName;
                        var _getPassword = $scope.login.password;
                        var _isUser = _getUser.users.filter(function(user) {
                            return user.userName === _getUserName && user.password === _getPassword;
                        })
                        _isUser.length == 0 ? ($scope.errLogin = 'User Does not exist') : successfullLogin(_getUserName, _isUser[0].userId);
                    }


                    $scope.register = function(event, useFullScreen) {
                        $mdDialog.show({
                            templateUrl: '../../html/registerForm.html',
                            parent: angular.element(document.body),
                            targetEvent: event,
                            clickOutsideToClose: true,
                            fullscreen: useFullScreen,
                            controller: RegisterUserController
                        })
                    }}

               function successfullLogin(userName, userId) {
                    $mdDialog.hide();
                    $scope.userWelcome = userName;
                    _getLoggedInUser._storeUserInfo(userName,userId);
                    $scope.showLoginButton();
                    MySharedService._isLogin(true,userName,userId);
                    }

                function RegisterUserController($scope, $mdDialog) {
                    console.log(" --Registering User --");
                    $scope.registerUser = function(event) {
                   };
                }
                $(window).on('scroll',function(event){
                    if($(window).scrollTop()>=85){
 $("#mainToolbar").addClass('fixHeader');
                    }else{
$("#mainToolbar").removeClass('fixHeader');
                    }
                   
                })
                }
        ]).run(function($location, $rootScope,$state) {
            /*$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
               console.log("foo");
           });*/
            setTimeout(function() {
                var _logOut = document.getElementById('logOut');
                _logOut.addEventListener('click', function(e) {
                    /*$rootScope.$apply(function() {
                        $location.path("/books");
                    });*/
                    $state.go('home.books');
                });
            }, 2000)});

    },

    _createCarousel: function($scope, bookData) {
        var _newRelease = [];
        _newRelease.push(bookData[0], bookData[9], bookData[3], bookData[5], bookData[7]);
        $scope.carouselData = _newRelease;},
}