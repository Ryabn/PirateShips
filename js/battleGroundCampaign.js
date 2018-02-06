var level = 0;

function endOfRound(){
    
}
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
    
}
function generateEnemies(){
    for(var i = 0; i <= Math.ceil(iEnemyCount); i++){
        var x = generateEnemyCoordinatesX();
        var y = generateEnemyCoordinatesY();
        enemyShips.push(new enemyBoat(window.innerHeight*iEnemySize/8, window.innerHeight*iEnemySize/16, './images/boats/boatFinal/enemy1.png', x, y, iEnemyHealth, iEnemyTurn));
        animateIntoMap(enemyShips[i]);
    }
}