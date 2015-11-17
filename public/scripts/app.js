/**************************************
**********Primary app module***********
**************************************/

(function() {
  console.log('app.js loading');

  var app = angular.module('rummyModule',['playerEntry','rummyTable'])
    .controller("RummyController", ['$http',function($http) {
      this.templates = {
        header: "views/header.html",
        footer: "views/footer.html"
      }
  }])
    .directive('gamesDisplay', ['$http',function($http) {
      return {
        restrict: 'E',
        templateUrl: './views/games-display.html',
        controller: function() {
          var controller = this;
          this.displayed = false;
          this.games = [];

          this.getGames = function() {
            $http.get('/games').then(
              function(result) {
                var tempArray = result.data[0];
                for (var i = 0; i < tempArray.length; i++) {
                  var tempGame = {
                    date: tempArray[i].date,
                    winners: tempArray[i].winners,
                    players: []
                  }
                  for (var j = 0; j < tempArray[i].players.length; j++) {
                    var tempPlayer = {
                      name: tempArray[i].players[j].name,
                      total: tempArray[i].totals[j]
                    }
                    tempGame.players.push(tempPlayer);
                  }
                controller.games.push(tempGame);
                console.log(tempGame);
                }
              }, function(error) {
                console.log(error);
              });

            this.displayed = !this.displayed;
          }

        },
        controllerAs: 'games'
      }
    }])
    .service('usersSvc', function($http) {
      var users = []; //this array stores the users available to be selected.
      var selection = []; //this array stores the users selected for the game.
      this.error;

      return {

        //returns the current users array
        getUsers: function() {
          return users;
        },

        //returns the current selection array
        getSelection: function() {
          return selection;
        },

        setSelection: function(users) {
          selection = users;
        },

        //Creates a new user in the db
        createUser: function(newUser) {  //TODO FIXME WORK ON ERROR HANDLING
          $http.post('/users',newUser)
            .then(function(user) {
              console.log(user);
              if (user.data.error) {
                this.error = user.data.error;
                 console.log(user.data.error);
              }
            }, function(err) {
              console.log(err);
            });
        },

        updateUser: function(user) {
          var id = user._id;
          user = JSON.stringify(user);
          console.log('stringified user');
          console.log(user);
          $http.patch('/users/' + id, user)
            .then(function(success){
              console.log(success);
            },
            function(error){
              console.log(error);
            });
        },

        //adds users to the array TODO delete this?
        addUsers: function(array) {
          users = [];
          for (var i = 0; i < users.length; i++) {
            users.push(array[i]);
          }
        },

        //not currently used -- to be used if I want to add in capability to remove users
        deleteUser: function(user) {
          for (var i = 0; i < users.length; i++) {
            if (users[i] == user) {
              users.splice(i, 1);
              return true;
            } else {
              return false;
            }
          }
        }
      }
    });
})();
