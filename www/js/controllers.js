angular.module('starter.controllers', [])

.controller('LoginCtrl', [
    '$scope', '$state', '$timeout', 'FirebaseDB',
    function LoginCtrl($scope, $state, $timeout, FirebaseDB) {

      //Funcion para hacer login de usuario
      $scope.doLoginAction = function (_credentials) {
        FirebaseDB.login(_credentials).then(function (authData) {
        console.log("Se ha hecho login con el usuario: ", authData.uid);
        $state.go('tab.chats', {})
      }).catch(function (error) {
        // Si hay error (y no se puede hacer login)
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("ERROR: Ha fallado autenticación: ", error);
          
      });

    }

    //Funcion para crear usurio
    $scope.doCreateUserAction = function (_credentials) {
      FirebaseDB.createUser(_credentials).then(function (authData) {
      console.log("Se ha creado el usuario: ", authData);
      
      //No hacemos login automaticamente
      //$state.go('tab.chats', {})
      }).catch(function (error) {
        //Si hay error en la creación de usuario
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("ERROR: No se ha podido crear usuario: ", error);
        
      });

    }
    }])

.controller('HomeCtrl', function($scope) {

  //Controlado de página Home vacio
  console.log("En la página HOME");

})

.controller('ChatsCtrl', function($scope, $timeout, Chats, FirebaseDB, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
    
     $scope.doLogout = function () {
      $timeout(function () {
        $state.go('login', {})
      }, 1);

      firebase.auth().signOut()
      

    }

    console.log("En la pestaña de chats")

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})



.controller('ChatDetailCtrl', function($scope, $stateParams,$timeout, Chats, FirebaseDB, $state) {
  $scope.chat = Chats.get($stateParams.chatId);
    
    
     $scope.doLogout = function () {
      $timeout(function () {
        $state.go('login', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo de la aplicación...");

    }
})

.controller('AccountCtrl', function($scope, $stateParams,$timeout, Chats, FirebaseDB, $state) {
  $scope.settings = {
    enableFriends: true
  };
    
     
     $scope.doLogout = function () {
      $timeout(function () {
        $state.go('login', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo ...");

    }
    
});
