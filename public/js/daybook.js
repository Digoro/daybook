var app = angular.module('dayBookApp', []);

app.controller('daybookListCtrl', function($scope, $http){
   $http.get('/api/books')
       .success(function(res){
          $scope.daybooks = res;
       });
});

app.directive('daybookList', function (){
   var link = function(scope, element, attrs){

   };
   var controller = function ($scope){
   };
   return {
      restrict: 'E',
      controller: controller,
      link: link,
      templateUrl: '/views/directives/daybook-list.html'
   }
});