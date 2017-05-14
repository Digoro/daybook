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

app.directive('inputDaybook', function (){
   var link = function(scope, element, attrs){

   };
   var controller = function ($scope, $http){
      $scope.submit = function(){
         var title = $('#title').val();
         var content = $('#content').val();
         var data = {title: title, content: content}
         $http.post('/api/daybooks', data)
             .success(function(res){
                $scope.daybooks = res;
             })
      }
   };
   return {
      restrict: 'E',
      controller: controller,
      link: link,
      templateUrl: '/views/directives/input-daybook.html'
   }
});