/**************************************
*****Module for the scoring table******
**************************************/

(function(){
  console.log('rummy-table.js loading');

  angular.module('rummyTable', [])
         .directive('scoreTable', function() {
            return {
              restrict: 'E',
              templateUrl: './views/rummy-table.html',
              controller: function(usersSvc) {

                //TODO move this to its own javascript (outside of the controller)
                //and make this a constructor function. in startGame() below we'll have
                //var game = new Game(); ....
                this.game = {
                  winningScore: 500, //TODO eventually allow for games to be played to other scores
                  players: [],
                  score: {
                    currentTurnScores: [], //holds (fairly obviously) an array of the current turn's scores
                    turns: [], //an array of arrays, where each subarray is an array of the scores for a single turn
                    totals: []
                  },
                  winners: [],
                  started: false
                };

                this.displays = {
                  startButtonText: "Let's score us some rummy",
                  winningText: ""
                }

                this.startGame = function() {
                  var selection = usersSvc.getSelection();
                  if (selection.length > 1) {
                    this.game.players = selection;
                    this.game.started = true;
                    for (var i = 0; i < selection.length; i++) {
                      this.game.score.totals.push(0);
                    }
                  } else {
                    this.startButtonText = "Finish selecting players then click me!"
                  }
                };

                this.receiveScores = function(scores) {
                  console.log(this.game);
                  var weHaveAWinner = false;
                  var totals = this.game.score.totals;
                  var turns = this.game.score.turns;

                  turns.push(scores);
                  for (var s = 0; s < totals.length; s++) {
                    totals[s]+= scores[s];
                    console.log('totals: ' + totals);
                    if (totals[s] >= this.game.winningScore) {
                      weHaveAWinner = true;
                    }
                    console.log(weHaveAWinner);
                  }

                  this.game.score.currentTurnScores = [];
                  if (weHaveAWinner) {
                    this.endGame(totals);
                  }
                };

                this.endGame = function(finalScores) {
                  var maxScore = this.game.winningScore;
                  for (var i = 0; i < finalScores.length; i++) {
                    if (finalScores[i] >= maxScore) {
                      maxScore = finalScores[i];
                      this.game.winners.push(this.game.players[i])
                    }
                  }
                  console.log(this.game.winners);
                  var winnersCount = this.game.winners.length;
                  var text = "";
                  switch (winnersCount) {
                    case 1:
                      text = "We have a winner! " + this.game.winners[0].name +
                      " wins with a final score of " + maxScore;
                      break;
                    case 2:
                      text = "We have a tie! " + this.game.winners[0].name + " and "
                      + this.game.winners[1].name + " are tied with a final score of " + maxScore;
                      break;
                    case 3:
                      text = "Crazy! A three-way tie! " +
                        this.game.winners[0].name + ", " + this.game.winners[1].name + " and "
                        + this.game.winners[2].name + "are all tied at " + maxScore + " points. Whoa!";
                      break;
                    case 4:
                      text = "Un-#$%&-believable! A four-way-tie!" +
                        this.game.winners[0].name + ", " + this.game.winners[1].name + ", " + this.game.winners[2].name
                        + ", and " + this.game.winners[3].name + " are ALL tied at " + maxScore;
                      break;
                    default:
                    text = "uh-oh something's wrong";
                  }
                  this.displays.winningText = text;
                };
              },
              controllerAs: 'table'
            }
          });
})();
