var level = 0;

function startNewRound(){
    changeLevel();
    generateEnemies();
}
function changeLevel(){
    level++;
    document.getElementById('LevelDescription').innerHTML = "Lv. " + level;
}
function isDead(){
    clearInterval(battlefield.interval);
    document.getElementById('endingGameWrapper').style.display = "block";
    newHighScore();
    document.getElementById('finalScore').innerHTML = "Level Incomplete!";
}
function backToHome(){
    window.location = 'battleMode.html';
}
function newHighScore(){
    if(level > highScore){
        highScore = level;
        strgLocDat.setItem('endlessScore', level);
    }
}
function generateEnemies(){
    //will generate enemies based off of level which is a global variable
}