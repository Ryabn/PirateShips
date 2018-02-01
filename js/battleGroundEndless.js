var level = 1;

function endOfRound(){
    level++;
    startNewRound();
}
function startNewRound(){
    changeLevel();
}
function changeLevel(){
    document.getElementById('LevelDescription').innerHTML = "Lv. " + level;
}
function isDead(){
    document.getElementById('endingGameWrapper').style.display = "block";
}
function backToHome(){
    
}