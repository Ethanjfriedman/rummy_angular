/**************************************
***Module for the player entry form****
**************************************/

(function() {

  console.log('player-entry.js loading');

  angular.module('playerEntry', [])
    .directive('playerEntry', ['$http', 'usersSvc',function($http,usersSvc) {
      return {
        restrict: 'E',
        templateUrl: './views/player-entry.html',
        controller: function() {
          //TODO create a selection object to hold much of this.
          var controller = this;
          this.started = false; //Boolean that indicates whether user has begun the player entry process
          this.playersEntered = []; //array of players selected to participate in the game
          this.numPlayers = 0; //should be an integer in [2,3,4]
          this.availablePlayers = []; //array of players available to be selected
          this.newPlayerName = "";
          this.selectionComplete = false; //boolean for when all done. TODO simplify these various booleans.

          //Makes a GET request to the server to pull the available users in from the db.
          this.fetchUsers = function() {
            $http.get('/users')
            .then(function(result){
              users = result.data.users;
              controller.availablePlayers = users;
            }, function(error){
              console.log('error fetching users from db');
              console.log(error);
            });
          };

          this.goBack = function() {
            this.started = !this.started
            this.numPlayers = 0;
            this.playersEntered = [];
            usersSvc.setSelection([]);
          };

          this.fetchUsers();

          this.createNewPlayer = function() { //TODO WORK ON ERROR HANDLING HERE!
            var newPlayer = ({
              name: this.newPlayerName,
              record: { wins: 0, losses: 0, ties: 0 },
              dateCreated: Date.now()
            });

            usersSvc.createUser(JSON.stringify(newPlayer));  //runs the service method which should post the player to the DB
            this.availablePlayers.push(newPlayer); //updates the list of available players with the new player
            this.playersEntered.push(newPlayer); //adds the new player to the list of selected players
            this.newPlayerName = ''; //zeroes out the newplayername var.
          },

          //sends the playersEntered array of selected players into the usersSvc to be available
          //to the rummy-table directive. Also sets the doneEntering Boolean (to hide various divs).
          this.doneEntering = function() {
            usersSvc.setSelection(this.playersEntered);
            this.selectionComplete = true;
          },

          //this function compares the number of currently selected players (playersEntered.length)
          //with the final number to be chosen (numPlayers)
          this.compareNums = function() {
            return this.numPlayers - this.playersEntered.length;
          },

          //this function chooses the appropriate header to appear in the 'choose X Num of Players' div
          this.headerSelect = function() {
            var num = this.compareNums();
            var header = "";

            if (num > 1) {
              header = "Select " + num + " More Players";
            } else if (num === 1) {
              header = "Select 1 More Player"
            } else {
              header = "If you're done selecting, click below";
            }
            return header;
          }
        },
        controllerAs: 'entry'
      }
    }]);
})();
