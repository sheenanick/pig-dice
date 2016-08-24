function Player(playerNumber) {
  this.playerNumber = playerNumber;
  this.gameScore = 90;

}

Player.prototype.totalScore = function(turnScore) {
  return this.gameScore += turnScore;
}

var playerArray = [];

function getRandomInt() {
return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function nextPlayer(array, currentTurn) {
  if(currentTurn % 2 === 0) {
    return array[1];
  } else {
    return array[0];
  }
}

$(document).ready(function() {
  var currentTurn = 0;
  var turnScore = 0;
  var player1 = new Player(1);
  var player2 = new Player(2);
  playerArray.push(player1);
  playerArray.push(player2);
  var currentPlayer = playerArray[0];
  $("#player").text(currentPlayer.playerNumber);
  $("#score1").text(player1.gameScore);
  $("#score2").text(player2.gameScore);
  $("#roll-dice").click(function(){
    var roll = getRandomInt()
    $("#roll").text(roll);

    if (roll === 1) {
      turnScore = 0;
      $("#turnScore").text(turnScore);
      console.log(currentPlayer);
      currentPlayer = nextPlayer(playerArray, currentTurn);
      $("#player").text(currentPlayer.playerNumber);
      $("#score1").text(player1.gameScore);
      $("#score2").text(player2.gameScore);
      console.log(currentTurn);
      currentTurn ++;
    } else {
      turnScore += roll;
      $("#turnScore").text(turnScore);
      if(currentPlayer.gameScore + turnScore >= 100){
        $("#turnScore").append("<span>Don't get greedy</span>")
      }
    }
  });
  $("#pass-turn").click(function(){
    $("#roll").text("");
    $("#turnScore").text("");
    currentPlayer.totalScore(turnScore);
    console.log(currentPlayer);
    $("#score1").text(player1.gameScore);
    $("#score2").text(player2.gameScore);
    if(currentPlayer.gameScore >= 100){
      alert("You Win!");
    } else {
      currentPlayer = nextPlayer(playerArray, currentTurn);
      $("#player").text(currentPlayer.playerNumber);
      console.log(currentTurn);
      currentTurn ++;
      turnScore = 0;
    }
  });
});
