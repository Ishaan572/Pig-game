/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores , roundScore , activePlayer , rollBtn , holdBtn , newBtn , gamePlaying , oldDice;
var diceImg1 = document.querySelector("#dice1");
var diceImg2 = document.querySelector("#dice2");
var nonac = 0;
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  
   diceImg1.style.display = 'none';
diceImg2.style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

init();

rollBtn = document.querySelector(".btn-roll")
  holdBtn = document.querySelector('.btn-hold');
  newBtn = document.querySelector('.btn-new')

function changePlayer(){//Next player
  activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

 diceImg1.style.display = 'none';
diceImg2.style.display = 'none';}



function rollDice(){
 if (gamePlaying){//Random number
 var dice1 =Math.floor(Math.random()*6 + 1);
      var dice2 =Math.floor(Math.random()*6 + 1);
//Display result

diceImg1.style.display = 'block';
diceImg2.style.display = 'block';
diceImg1.src = 'dice-' + dice1 + '.png';
     diceImg2.src = 'dice-' + dice2 + '.png';


//Add to current score if dice is not 1
if( dice1 !== 1 && dice2 !== 1){
  //Add score
  roundScore = roundScore + dice1 + dice2;
  document.querySelector('#current-' + activePlayer).textContent = roundScore ;
  
}
else{
  //Next score
changePlayer();

}
}}





function holdDice (){
if (gamePlaying){
  //Add current score to global score
scores[activePlayer] += roundScore;
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] ;
//Update UI
if(activePlayer == 1){
  activePlayer = 0;
}
else{activePlayer = 1}
if(activePlayer == 1){
  nonac = 0;
}
else{nonac = 1}


roundScore = 0;
document.getElementById('current-0').textContent = '0'; 
document.getElementById('current-1').textContent = '0'; 
document.querySelector('.player-0-panel').classList.toggle('active');
document.querySelector('.player-1-panel').classList.toggle('active');
 diceImg1.style.display = 'none';
diceImg2.style.display = 'none';
if(scores[nonac] >= 100){
  document.querySelector('#name-' + nonac).textContent = 'Winner!';
          diceImg1.style.display = 'none';
diceImg2.style.display = 'none';
            document.querySelector('.player-' + nonac + '-panel').classList.add('winner');
            document.querySelector('.player-' + nonac + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false;
}}
}
function newGame(){
init();

}


newBtn.addEventListener('click' , newGame);
rollBtn.addEventListener('click', rollDice) ;
holdBtn.addEventListener('click' , holdDice);
