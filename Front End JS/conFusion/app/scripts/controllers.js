'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }])

         .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.commentObj = {rating:"5", comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                                $scope.commentObj.date = new Date().toISOString();
                                console.log($scope.commentObj);
                                $scope.dish.comments.push($scope.commentObj);

                                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                                $scope.commentForm.$setPristine();
                                $scope.commentObj = {rating:"5", comment:"", author:"", date:""};
            };
        }])

       // implement the IndexController and About Controller here
      .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

                $scope.featuredDish = {};

                $scope.showDish = false;
                $scope.message="Loading ...";
                $scope.featuredDish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                            function(response){
                                $scope.featuredDish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );

                // $scope.featuredDish = menuFactory.getDish(0);

                $scope.leader = corporateFactory.getLeader(3);

                $scope.leader = {};
                $scope.showLeader = false;
                $scope.message="Loading ...";
                $scope.leader = corporateFactory.getLeaders().get({id:3})
                .$promise.then(
                            function(response){
                                $scope.leader = response;
                                $scope.showLeader = true;
                            },
                            function(response){
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );

                // $scope.promoDish = menuFactory.getPromotion(0);

                $scope.promoDish = {};
                $scope.showDish = false;
                $scope.message="Loading ...";
                $scope.promoDish = menuFactory.getPromotion.get({id:0})
                .$promise.then(
                            function(response){
                                $scope.promoDish = response;
                                $scope.showDish = true;
                            },
                            function(response){
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );


       }])

       .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){

                  var leaders = corporateFactory.getLeaders();

                  $scope.leaders = leaders;

                  $scope.showLeaders = false;
                  $scope.message = "Loading ...";
                  corporateFactory.getLeaders().query(
                            function(response){
                                $scope.showLeaders = true;
                                $scope.leaders = response;
                            },
                            function(response){
                                $scope.message = "Error:" + response.status + " " + response.statusText;
                            }
                        );


       }]) 
;