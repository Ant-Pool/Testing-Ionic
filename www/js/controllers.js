angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.schedule = function() {

    document.addEventListener('deviceready', function() {
      // cordova.plugins.backgroundMode is now available
      // Android customization
      cordova.plugins.backgroundMode.setDefaults({
        title: "Checking temperature"
      });
      cordova.plugins.backgroundMode.enable();
      cordova.plugins.backgroundMode.onactivate = function() {
        setInterval(function() {
          //weatherNotific($scope, $http);
          $http.get('http://api.openweathermap.org/data/2.5/weather?q=Tel%20Aviv,il&units=metric').success(function(data, status, headers, config) {
            var weather = "" + data.main.temp + " degrees. " + data.weather[0].description;
            $scope.text = weather;
            cordova.plugins.backgroundMode.configure({
              text: weather,

            });
          }).error(function(data) {
            $scope.text = "Error: " + data;
          });
        }, 30 * 1000);

      };

      cordova.plugins.backgroundMode.ondeactivate = function() {
        cordova.plugins.notification.local.schedule({
          id: 2,
          text: "The app will not provide anymore details from now on",
          icon: 'http://www.optimizeordie.de/wp-content/plugins/social-media-widget/images/default/64/googleplus.png',
          sound: null,
          data: {
            test: 1
          }
        });

      };
      cordova.plugins.backgroundMode.onfailure = function(errorCode) {
        $scope.text = "" + errorCode;
      };
    }, false);


  };
  $scope.text = "Nothing yet";
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


function weatherNotific($scope, $http) {
  $http.get('http://api.openweathermap.org/data/2.5/weather?q=Tel%20Aviv,il&units=metric').success(function(data, status, headers, config) {
    var weather = "" + data.main.temp + " degrees. " + data.weather[0].description;
    var now = new Date();
    $scope.text = weather;
    cordova.plugins.notification.local.schedule({
      id: 1,
      text: weather,
      icon: 'http://www.optimizeordie.de/wp-content/plugins/social-media-widget/images/default/64/googleplus.png',
      sound: null,
      data: {
        test: 1
      }
    });
  }).error(function(data) {
    $scope.text = "Error: " + data;
  });
}