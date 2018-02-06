var level = 0;
var iEnemySpeed = 1, iEnemyHealth = 20, iEnemyDamage = 50, iEnemySpeed = 1, iEnemyTurn = 0.01, iEnemyCount = 1, iEnemySize = 1;

function endOfRound(){
    changeLevel();
    generateEnemies();
}
function changeLevel(){
    level++;
    iEnemyCount += 0.5;
    iEnemySpeed += 0.1;
    iEnemyTurn += 0.02;
    iEnemyHealth += 10;
    iEnemyDamage += 10;
    iEnemySize += 0.02;
    document.getElementById('LevelDescription').innerHTML = "Lv. " + (level + 1);
}
function isDead(){
    clearInterval(battlefield.interval);
    document.getElementById('endingGameWrapper').style.display = "block";
    newHighScore();
    document.getElementById('finalScore').innerHTML = "Rounds Lived: " + level + "<br>" + "High Score: " + highScore;
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
    for(var i = 0; i <= Math.ceil(iEnemyCount); i++){
        var x = generateEnemyCoordinatesX();
        var y = generateEnemyCoordinatesY();
        enemyShips.push(new enemyBoat(window.innerHeight*iEnemySize/8, window.innerHeight*iEnemySize/16, './images/boats/boatFinal/enemy1.png', x, y, iEnemyHealth, iEnemyTurn));
        animateIntoMap(enemyShips[i]);
    }
}