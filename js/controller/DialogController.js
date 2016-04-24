module.exports={
   
   initDialogController :function(appModule){
       console.log("Method Executing:DialogController.initDialogController");
       appModule.controller('DialogController', ['$scope','$mdDialog', '$mdMedia','CustomMessageService','BasketService',
        function($scope,$mdDialog,$mdMedia,CustomMessageService,BasketService){
        
        $scope.delItem = function(){
        	$mdDialog.hide();
            BasketService.removeItem();
         };
        $scope.closeDialog = function(){
          console.log('Method Executing:DIalogController.');
          $mdDialog.cancel();
        }



       }]);
    }
};