module.exports = {

    initBookController: function(appModule, bookData) {
        console.log('Method Executing:BookController.initBookController');

        appModule.controller('BookController', ['$scope', '$mdDialog', '$mdMedia','BasketService', function($scope, $mdDialog, $mdMedia,BasketService) {
            
            var self;
            /* Setting data for template*/
            // module.exports._createCarousel($scope,bookData);
            $scope.dataset = bookData;
            $scope.buy = function($event) {
                console.log($($event.currentTarget).attr('data-id'));
                var _getTargetBook = $($event.currentTarget).attr('data-id');
                BasketService.updateBasket(_getTargetBook);
                
                
            };

            $scope.showMore = function(event) {
                self = this;
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                        //controller:ShowMoreController,
                        templateUrl: '../../html/showMore.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen,
                        controller: ShowMoreController });
                    }

            function ShowMoreController($scope, $mdDialog) {
                
                var _getDialogData = self.data;  // data  is propert of $scope
                $scope.dialogHeader = _getDialogData.name; // Dialog Header
                $scope.description = _getDialogData.desc; // description text
                $scope.dialogImage = _getDialogData.coverpic; // image
                $scope.language = _getDialogData.language;
                $scope.price = _getDialogData.price;
                $scope.prodId = _getDialogData.id;
                if (_getDialogData.paperback == true) {
                    $scope.binding = "Paperback"; //binding type
                } else {
                    $scope.binding = "Hardcover"; //binding type
                }
                if (_getDialogData.listprice !== "" || _getDialogData.listprice !== null) {
                    $scope.listprice = _getDialogData.listprice;
                }}

        }]);
    },

      /* Will create carousel*/ 
    _createCarousel: function($scope, jsonData) {
        console.log("Method Executing:BookController._createCarousel");
        var _newRelease = [];
        _newRelease.push(jsonData[0], jsonData[9], jsonData[3], jsonData[5], jsonData[7])
        console.log(_newRelease)
        $scope.carouselData = _newRelease;},
    
}