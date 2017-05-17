var app = angular.module('dayBookApp', []);
var selected_id = "";
app.controller('daybookListCtrl', function($scope, $http){

});

app.directive('daybookList', function (){
   var link = function(scope, element, attrs){

   };
   var controller = function ($scope, $http){
      $http.get('/api/books')
          .then(function(res){
             $scope.daybooks = res.data;
          });
      $scope.remove = function(id){
         $http.delete('/api/books/' + id)
             .then(function (res) {
                $scope.daybooks = res.data;
                bootbox.alert('daybook이 삭제되었습니다.')
             })
      };
      $scope.view = function(id){
         selected_id = id;
         $http.get('/api/books/' + id)
             .then(function (res) {
                $scope.title = res.data.title;
                $scope.content = res.data.content;
                $('#submitBtn').css('display', 'none');
                $('#editBtn').css('display', 'block');
             });
      }
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
      $scope.submit = function(title, content){
         $http.post('/api/books', {title: title, content: content})
             .then(function (res) {
                $scope.daybooks = res.data;
                $scope.title = "";
                $scope.content = "";
                bootbox.alert("새 daybook이 등록되었습니다");
             });
      };
      $scope.edit = function (title, content) {
         $http.put('/api/books/' + selected_id, {title: title, content: content})
             .then(function (res) {
                $scope.daybooks = res.data;
                $('#submitBtn').css('display', 'block');
                $('#editBtn').css('display', 'none');
                $scope.title = "";
                $scope.content = "";
                bootbox.alert('daybook이 수정되었습니다.');
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
