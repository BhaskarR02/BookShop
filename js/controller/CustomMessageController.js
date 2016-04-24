module.exports={
   
   initCustomMessageController :function(appModule){
   	console.log("Method Executing:CustomMessageController.initCustomMessageController");
     appModule.controller('CustomMessageController', ['$scope','MySharedService','BasketService', 'CustomMessageService',
     	 function($scope,MySharedService,BasketService,CustomMessageService){
            $scope.customMessage = CustomMessageService.customMessage;
     
     }]);


   }



};