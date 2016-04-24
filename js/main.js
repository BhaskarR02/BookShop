var _loadAngular = require('angular');
var _loadAngularMaterial = require('angular-material');
var _loadAngularMessage = require('angular-messages');
var _loadAngularBootstrap = require('angular-bootstrap-npm');

require('./utility.js');
require('angular-ui-router');
require('bootstrap');


var loginController = require('./controller/LoginController');
var bookController = require('./controller/BookController');
var welcomeController = require('./controller/welcomeController');
var profileController = require('./controller/ProfileController');
var basketController = require('./controller/BasketController');
var customMessageController = require('./controller/CustomMessageController');
var dialogController = require('./controller/DialogController');
var paymentController = require('./controller/PaymentController');



var _data = require('./bookjson');

var _getAppModule = document.getElementsByTagName('html')[0].getAttribute('ng-app');
console.log(_getAppModule);
var appModule = angular.module(_getAppModule, ['ngMaterial', 'ngMessages', 'ngAnimate', 'ui.router', 'ui.bootstrap'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: "../html/login.html"
            })
            .state('home', {
                url: '/home',
                templateUrl: "../html/home.html"

            })
            .state('home.basket', {
                url: '/basket',
                templateUrl: '../html/basket.html'
            })
            .state('home.payment', {
                url: '/payment',
                templateUrl: '../html/payment.html'
            })
            .state('home.profile', {
                url: '/profile',
                templateUrl: '../html/profile.html',
                controller: 'ProfileController'
            })
            .state('home.books', {
                url: '/books',
                templateUrl: '../html/books.html',
                controller: 'BookController'
            })
            .state('home.sell', {
                url: '/sell',
                templateUrl: '../html/sell.html',
                controller: ''
            })
            .state('home.success',{
                url:'/success',
                templateUrl:'../html/success.html',
                controller:''
            })
            .state('home.payment.rewards', {
                url: '/rewards',
                templateUrl: '../html/rewards.html'
            })
            .state('home.payment.cod', {
                url: '/cod',
                templateUrl: '../html/cashDelivery.html'
            })
            .state('home.payment.credit', {
                url: '/credit',
                templateUrl: '../html/credit.html'
            })
            .state('home.payment.debit', {
                url: '/debit',
                templateUrl: '../html/debit.html'
            })
            .state('home.payment.netbanking', {
                url: '/netbanking',
                templateUrl: '../html/netBanking.html'
            })
            .state('home.payment.giftvoucher', {
                url: '/giftvoucher',
                templateUrl: '../html/giftVoucher.html'
            });
        // $urlRouterProvider.otherwise('/home/books');
        $urlRouterProvider.otherwise(function($injector, $location) {
            var state = $injector.get('$state');
            state.go('home.books');
            return $location.path();

        });




    }]);


/* Shared service for logging information*/
appModule.factory('MySharedService', ['$rootScope', function($rootScope) {
    var sharedService = {};
    sharedService.loggedIn = false;
    sharedService._isLogin = function(bol, userName, userId) {
        this.loggedIn = bol;
        this.userId = userId;
        this.userName = userName;
        this.broadcastItem();
    };
    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('successfulLogIn');
    };
    return sharedService;
}]);
/* login service end here*/

/*Shared service for basket*/

appModule.factory('BasketService', ['$rootScope', function($rootScope) {
    var _basketService = {};
    var _bookQuantity = 1;
    var _allBooks = _data.jsonData();
    _basketService.basketArray = []; // Will contain id of book selected by user
    _basketService.selectedBooks = [];
    _basketService.delItem = "";
    _basketService.totalCount = 0;
    _basketService.uniqueCount=0;
    _basketService.getPrice = 0;
    

    _basketService.findBook = function(id) {
        var _filteredBook = _allBooks.filter(function(item) {
            return item.id === id;
        });
        return _filteredBook;
    };

    // This will add item to the basket.
    _basketService.updateBasket = function(id) {


        if (_basketService.basketArray.length === 0) {
            var _filteredBook = _basketService.findBook(id);
            _basketService.basketArray.push({
                bookId: id,
                bookQuantity: _bookQuantity,
                bookName: _filteredBook[0].name,
                bookPrice: _filteredBook[0].price
            });

        } else {
            // Check if that id exist or not 
            var _isIdExist = _basketService.basketArray.filter(function(item) {
                    return item.bookId === id;
                });
                // if id does not exist push this id

            if (_isIdExist.length === 0) {
                var _filteredBook = _basketService.findBook(id);
                _basketService.basketArray.push({
                    bookId: id,
                    bookQuantity: _bookQuantity,
                    bookName: _filteredBook[0].name,
                    bookPrice: _filteredBook[0].price
                });
            } else {
                $.each(_basketService.basketArray, function(i, obj) {
                    if (obj.bookId === id) {
                        obj.bookQuantity = obj.bookQuantity + 1;
                    }

                });
            }

        }
        this.boardcastBasket();
    };
    /* This will filter and  will create a new array from it

    */
    _basketService.removeItem = function() {
        console.log('Method Executing:BasketService.removeItem');
        _basketService.selectedBooks = _basketService.basketArray.filter(function(item) {
            return item.bookId !== _basketService.delItem;

        });
        _basketService.delItem = ""; // Reseting _basketService.delItem to empty string
        _basketService.basketArray.length = 0; //Clearing _basketService.basketArray & reseting to zero

        for (var i = 0; i < _basketService.selectedBooks.length; i++) {
            _basketService.basketArray.push(_basketService.selectedBooks[i]);
        }

        if (_basketService.basketArray.length === 0) {
            this.noItem();
        }
        this.boardcastBasket();};

    _basketService.numberOfItems = function() {
        console.log('Method Executing :BasketService.numberOfItems');
        _basketService.totalCount = 0;
        _basketService.uniqueCount=0;
        _basketService.getPrice = 0;
         // This will give the unique number of items in basket
        _basketService.uniqueCount = _basketService.basketArray.length;
        _basketService.basketArray.forEach(function(element,index){
            _basketService.totalCount += element.bookQuantity; 
           _basketService.getPrice += element.bookQuantity *element.bookPrice;
        });
        /*for(var i = 0;i<_basketService.basketArray.length;i++){
            _basketService.totalCount += _basketService.basketArray[i].bookQuantity;
        }

     basketArray.forEach(function(element,index){
    _totalSum += element.bookQuantity *element.bookPrice;
    })*/



        $rootScope.$broadcast('basketCount');
    };
     
    _basketService.boardcastBasket = function() {
        this.numberOfItems();
        $rootScope.$broadcast('basketUpdated');
    };

    _basketService.noItem = function() {
        this.numberOfItems();
        $rootScope.$broadcast('emptyBasket');
    };
     // Will calculate Price
     /*_basketService.calculatePrice = function(){
     console.log("Method Executing BasketService.calculatePrice");
         
     };*/
     
    return _basketService;
}]); /*BasketService End here*/


/*Custom Message Service*/
appModule.factory('CustomMessageService', ['$rootScope', function($rootScope) {

    var _customMessage = {};

    _customMessage.customMessage = "Please login to continue";
    /*_customMessage.updateCustomMessage = function(msg){
        this.customMessage = msg
     }*/
    _customMessage.dialogHeader = "";
    _customMessage.dialogBody = "";
    _customMessage.var_one = 0;


    return _customMessage;



}]);
appModule.factory('PaymentService', ['$rootScope', function($rootScope) {
    var _paymentService = {};
    _paymentService.total = 0;
    _paymentService.quantity = 0;

    return _paymentService;

}]);




welcomeController.initWelcomeController(appModule, _data.jsonData());
bookController.initBookController(appModule, _data.jsonData());
profileController.initProfileController(appModule);
basketController.initBasketController(appModule);
customMessageController.initCustomMessageController(appModule);
dialogController.initDialogController(appModule);
paymentController.initPaymentController(appModule);


window.$zopim || (function(d, s) {
    var z = $zopim = function(c) {
            z._.push(c)
        },
        $ = z.s =
        d.createElement(s),
        e = d.getElementsByTagName(s)[0];
    z.set = function(o) {
        z.set.
        _.push(o)
    };
    z._ = [];
    z.set._ = [];
    $.async = !0;
    $.setAttribute("charset", "utf-8");
    $.src = "//v2.zopim.com/?3rDXRO5IsQxPXHNbpTKxnqcEsRFcwyKR";
    z.t = +new Date;
    $.
    type = "text/javascript";
    e.parentNode.insertBefore($, e)
})(document, "script");