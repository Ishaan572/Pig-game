/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores , roundScore , activePlayer , rollBtn , holdBtn;
scores = [0,0];
roundScore = 0;
activePlayer = 0; 
document.querySelector(".dice").style.display = 'none';
rollBtn = document.querySelector(".btn-roll")
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0'; 
document.getElementById('current-1').textContent = '0';
  holdBtn = document.querySelector('.btn-hold');

function changePlayer(){//Next player
  activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';}




function rollDice(){
//Random number
 var dice =Math.floor(Math.random()*6 + 1);
//Display result
var diceImg = document.querySelector(".dice");
diceImg.style.display = 'block';
diceImg.src = 'dice-' + dice + '.png';
//Add to current score if dice is not 1
if( dice !== 1){
  //Add score
  roundScore = roundScore + dice;
  document.querySelector('#current-' + activePlayer).textContent = roundScore ;
}
else{
  //Next score
changePlayer();

}
}





function holdDice (){
//Add current score to global score
scores[activePlayer] += roundScore;
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] ;
//Update UI
if(activePlayer == 1){
  activePlayer = 0;
}
else{activePlayer = 1}
roundScore = 0;
document.getElementById('current-0').textContent = '0'; 
document.getElementById('current-1').textContent = '0'; 
document.querySelector('.player-0-panel').classList.toggle('active');
document.querySelector('.player-1-panel').classList.toggle('active');
document.querySelector(".dice").style.display = 'none';
if(scores[activePlayer] >= 10){
  document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}
}
//Check if player won

rollBtn.addEventListener('click', rollDice) ;
holdBtn.addEventListener('click' , holdDice);
