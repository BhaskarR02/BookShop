var _getLoggedUser = require('./LoginController.js');
var _getUser = require('../loginCredential');

module.exports={
  initPaymentController :function(appModule){
    appModule.controller('PaymentController', ['$scope','$state','PaymentService','BasketService', 
      function($scope,$state,PaymentService,BasketService){

      var _pointer = angular.element('<div class="paymentPointer"/>'); // Arrow pointer  
    	$state.go('home.payment.rewards');
     $(".paymentSelection li:first").append($(_pointer));
    

      if(BasketService.totalCount !==0){
    	$scope.orderQuantity=BasketService.totalCount;
       }

    	$scope.netPrice =PaymentService.total;
    	$scope.payamount=PaymentService.total;
    	$scope.isEnable = false;
       
        $scope.firstName = "";
        $scope.address_1 ="";
        $scope.address_2 ="";
        $scope.buttonText="";

        var _isLogged = _getLoggedUser.isUserLogged();
        
        
        /* it will navigate to success page*/
         $scope.success=function(){
           console.log("Method Executing:PaymentController.success");
           $state.go('home.success');
         };


        /**/
        

        $scope.enableInput = function(){
         if(_isLogged.userId !==undefined && _isLogged.userName !==undefined){
          $scope.isEnable = false;
           var _filterUser =(_getUser.users).filter(function(user){
                return user.userId === _isLogged.userId && user.userName === _isLogged.userName;
           });
           $scope.buttonText = "Edit Address";
           $scope.firstName = _filterUser[0].name;
             $scope.address_1 = _filterUser[0].addr_1+' '+_filterUser[0].addr_2;
             $scope.address_2 =_filterUser[0].city+'-'+_filterUser[0].zipCode+','+_filterUser[0].state+','+_filterUser[0].country;
         }
       else{
       	   $scope.buttonText = "Save";
       	   $scope.isEnable = true;
           }
       };
          $scope.enableInput();

       
       $scope.editAdd=function($event){
         console.log("Method Executing:PaymentController.editAdd");

         if($scope.isEnable === true){
         	$scope.buttonText = "Edit Address";
         	$scope.isEnable=false;
         	}
         	else{
         		$scope.buttonText = "Save";
         		$scope.isEnable =true;
         	};

       };

     $(".paymentSelection li:first").addClass('current');

      $(".paymentSelection").on('click', 'li', function(event) {
        event.preventDefault();
        $(".paymentPointer").remove();
        $(".paymentSelection").find('li.current').removeClass("current");
        $(this).addClass('current').append(_pointer);
      });



    }]);

  },

_activePaymentSelection:function(){



}

}