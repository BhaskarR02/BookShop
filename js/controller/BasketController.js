module.exports={

  initBasketController:function(appModule){
    appModule.controller('BasketController', ['$scope','BasketService','CustomMessageService','PaymentService','$mdDialog','$mdMedia', function($scope,BasketService,CustomMessageService,PaymentService,$mdDialog,$mdMedia){
    	 $scope.status = '  ';
         $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
       var _getBasket = BasketService.basketArray;
       
       if(_getBasket.length === 0){
            CustomMessageService.customMessage = "You do not have any  item in your basket";
            module.exports._showBasketContent($scope,true);
       }
       else{

       	  $scope.dataset = BasketService.basketArray;
       	  module.exports._showBasketContent($scope,false);
       	  module.exports._getPrice($scope,BasketService.basketArray);

       }


       $scope.addBook = function($event){
         console.log("Method Executing: BookController.addBook");
         var _getAddId = $($event.currentTarget).attr('data-id');
         
         $.each(_getBasket,function(i,obj){
         	if(obj.bookId == _getAddId){
         		obj.bookQuantity = obj.bookQuantity+1;
         	}

         });
         
         // Calling Basket Service to calculate total amount
        
         	module.exports._getPrice($scope,BasketService.basketArray);
          console.log(BasketService.basketArray);
         	BasketService.numberOfItems();
         
       };


        $scope.checkDelCount = function($event,bookQuantity){
          console.log("Method Executing:basketController.checkDelCount");
          var _getDelId = $($event.currentTarget).attr('data-id');
          if(bookQuantity ===1){
            // setting the id in a variable for refernece;
            // If user want to completly remove the item it will 
            //update basket array with this id.
            BasketService.delItem = _getDelId;
            module.exports._confirmModal($event,$scope,$mdMedia,$mdDialog);
          }
          else{
          	 $scope.delBook(_getDelId);
          }
           BasketService.numberOfItems();
        };

        $scope.delBook = function(_bookId){
         console.log("Method Executing: BookController.delBook");
         $.each(_getBasket,function(i,obj){
         	if(obj.bookId == _bookId){
         		obj.bookQuantity = obj.bookQuantity-1;
         	}
         });
         BasketService.numberOfItems();
          module.exports._getPrice($scope,BasketService.basketArray);
       };

       // On every adddition or delete update the total count
       $scope.$on('basketUpdated',function(){
         module.exports._getPrice($scope,BasketService.basketArray);
         });

       /*Watch if basket is empty .If after operation 
       basket is empty then show no item in baske*/
       $scope.$on('emptyBasket',function(){
       	module.exports._showBasketContent($scope,true);
       });

      /* $('body').on('click','#paymentButton',function(event){
           $rootScope.$apply(function(){
                    $location.path("/payment");
                  })

      })*/
       
    }])
    .run(function($location,$rootScope,$state,PaymentService){
       $('body').on('click','#paymentButton',function(event){
            var _quantityValue = 0;
            var _getTotalQUantity = $(".bQuantity");
            $.each(_getTotalQUantity,function(){
           _quantityValue+= parseInt($(this).text().trim());

         });
          PaymentService.quantity = _quantityValue;
          PaymentService.total = $("#totAmount").text().trim();
          $state.go('home.payment');

      });




      
    })


  },

  
   
  _getPrice:function($scope,basketArray){
     console.log("Method Executing :BasketController._getPrice");
    var _totalSum = 0;
    basketArray.forEach(function(element,index){
    _totalSum += element.bookQuantity *element.bookPrice;
    })
     
    $scope.totalAmount =_totalSum;
  },



   /*If basket is empty it will show  'No item in Basket'
     else it will show the basket
     @params :$scope , boolean isBasketEmpty

   */


  _showBasketContent:function($scope,isBasketEmpty){
   console.log("Method Executing :BasketController._showBasketContent");
   if(isBasketEmpty == true){   
   	$scope.showBasket = false   // do not show basket if it is false
   }
   else{
   	$scope.showBasket=true; 
   }

  },
  _confirmModal:function($event,$scope,$mdMedia,$mdDialog){
     console.log("Method Executing:BasketController._confirmModal",$mdDialog);
    
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    $mdDialog.show({
      //controller:'DialogController',
      templateUrl: 'confirmView.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    /*.then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });*/



    /*$scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });*/

  











    }

}



