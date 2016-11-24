function Player(playerNumber) {
  this.playerNumber = playerNumber;
  this.gameScore = 0;

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
  function updateScores() {
    $("#score1").text(player1.gameScore);
    $("#score2").text(player2.gameScore);
  }
  function changePlayer(){
    currentPlayer = nextPlayer(playerArray, currentTurn);
    $("#player").text(currentPlayer.playerNumber);
    currentTurn ++;
  }
  var currentPlayer = playerArray[0];
  $("#player").text(currentPlayer.playerNumber);
  updateScores();
  $("#roll-dice").click(function(){
    $("#dice-select").hide();
    var dice = parseInt($("input:radio[name=dice]:checked").val());
    $('button#pass-turn').prop('disabled', false);
    var roll1 = getRandomInt();
    if(dice === 1){
      var roll2 = 0;
      var roll = roll1
      $("#roll").text(roll1)
    } else {
      var roll2 = getRandomInt();
      var roll = roll1 + roll2
      $("#roll").text(roll1 + ", " + roll2);
    }


    if(roll1 === 1 && roll2 === 1){
      currentPlayer.gameScore = 0;
      turnScore = 0;
      $("#turnScore").text(turnScore);
      updateScores();
      changePlayer();
    } else if (roll1 === 1 || roll2 === 1) {
      turnScore = 0;
      $("#turnScore").text(turnScore);
      updateScores();
      changePlayer();
    } else if (roll1 === roll2) {
      turnScore += roll;
      $("#turnScore").text(turnScore);
      $('button#pass-turn').prop('disabled', true);
    } else {
      turnScore += roll;
      $("#turnScore").text(turnScore);
      if(currentPlayer.gameScore + turnScore >= 100){
        $("#turnScore").append("<span> Don't get greedy</span>")
      }
    }
  });
  $("#pass-turn").click(function(){
    $("#roll").text("");
    $("#turnScore").text("");
    currentPlayer.totalScore(turnScore);
    updateScores();
    if(currentPlayer.gameScore >= 100){
      alert("You Win!");
      turnScore = 0;
      player1.gameScore = 0;
      player2.gameScore = 0;
      currentTurn = 1;
      changePlayer();
      updateScores();
      $("#dice-select").show();
    } else {
      changePlayer();
      turnScore = 0;
    }
  });
});
