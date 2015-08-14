angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.schedule = function(){
    //setTimeout($scope.notif, 60*1000);
     $http.get('http://api.openweathermap.org/data/2.5/weather?q=Tel%20Aviv,il&units=metric').success(function(data, status, headers, config){
             var weather =  "" + data.main.temp + " degrees. " + data.weather[0].description;
             var now = new Date();
             $scope.text = weather + " 1";
    cordova.plugins.notification.local.schedule({
           id: 1,
           text: weather,
           icon: 'http://www.optimizeordie.de/wp-content/plugins/social-media-widget/images/default/64/googleplus.png',
           sound: null,
           data: { test: 1}
         });
         $scope.text = weather + " 2";
           }).error(function(data){
             $scope.text = "Error: " + data;
           });
  };
  $scope.text = "Nothing yet";
  $scope.notif = function(){
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=Tel%20Aviv,il&units=metric').success(function(data, status, headers, config){
             var weather =  "" + data.main.temp + " degrees. " + data.weather[0].description;
             var now = new Date();
    cordova.plugins.notification.local.schedule({
           id: 1,
           text: weather,
           icon: 'http://www.optimizeordie.de/wp-content/plugins/social-media-widget/images/default/64/googleplus.png',
           sound: null,
           data: { test: 1}
         });
           });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
