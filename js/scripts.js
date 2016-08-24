function Player(playerNumber, computer) {
  this.playerNumber = playerNumber;
  this.computer = computer;
  this.gameScore = 80;
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
  $("button#play").click(function(){
    var currentTurn = 0;
    var turnScore = 0;
    var roll1, roll2, roll, player2, dice;
    var player1 = new Player(1, false);

    var computerOpponent = parseInt($("input:radio[name=computer]:checked").val());
    if (computerOpponent===1) {
      player2 = new Player(2, true);
    } else {
      player2 = new Player(2, false);
    }
    $("#dice-select, #computer-select").hide();
    dice = parseInt($("input:radio[name=dice]:checked").val());


    playerArray.push(player1);
    playerArray.push(player2);
    console.log(playerArray);
    function rollDice(){
      debugger;
      $('button#pass-turn').prop('disabled', false);
      roll1 = getRandomInt();
      if(dice === 1){
        roll2 = 0;
        roll = roll1;
        $("#roll").text(roll1)
      } else {
        roll2 = getRandomInt();
        roll = roll1 + roll2
        $("#roll").text(roll1 + ", " + roll2);
      }
      if(currentPlayer.playerNumber === 2){
        $("#player2-rolls").append("<li>" + roll1 + " : " + roll2 + "</li>");
      } else {
        $("#player1-rolls").append("<li>" + roll1 + " : " + roll2 + "</li>");
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
    }

    function updateScores() {
      $("#score1").text(player1.gameScore);
      $("#score2").text(player2.gameScore);
    }

    function resetGame(){
      updateScores();
      changePlayer();
      playerArray.splice(-2, 2);
      $("#dice-select, #computer-select").show();
      $("li").remove();
      $("#roll").text("");
      $("#turnScore").text("");
    }

    function computersTurn(){
      for (var i = 0; currentPlayer.computer; i++){
        if(currentPlayer.gameScore + turnScore >= 100){
          alert("Computer Wins!");
          resetGame();
        } else if (i < 2) {
          rollDice();
        } else if (roll1 === roll2){
          rollDice();
        } else if (i >= 2) {
          currentPlayer.totalScore(turnScore);
          updateScores();
          changePlayer();
          console.log(player2.gameScore);
        }
      }
    }

    function changePlayer(){
      currentPlayer = nextPlayer(playerArray, currentTurn);
      $("#player").text(currentPlayer.playerNumber);
      currentTurn ++;
      turnScore = 0;
      if (currentPlayer.computer) {
        computersTurn();
      }
    }
    var currentPlayer = playerArray[0];
    $("#player").text(currentPlayer.playerNumber);
    updateScores();
    $("#roll-dice").click(function(){
      rollDice();
    });
    $("#pass-turn").click(function(){
      $("#roll").text("");
      $("#turnScore").text("");
      currentPlayer.totalScore(turnScore);
      updateScores();
      if(currentPlayer.gameScore >= 100){
        alert("You Win!");
        resetGame();
      } else {
        changePlayer();
      }
    });
  });
});
