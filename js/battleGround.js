var playerBoat;
var cannon;
var iSpeed = 1, userBoatSpeedCoeff;
var boatImage = new Image(), cannonImage = new Image(), enemyImage = new Image();
var cannonShots = [], enemyShips = [];
var startX, startY, playerHealthMax;
var speedSlider;
var userTurnSpeed;
var shootSpeed = 1000;
var boatImageDat = strgLocDat.getItem("boatCreated");
const PI = 3.141, FULL_ROT = 6.283, BOAT_270 = 4.712, FOURTH_ROT = 1.571;


var battlefield = {
    canvas : document.createElement("canvas"),
    start: function() {
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight*0.85;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 30);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function setUserStats(){
    userTurnSpeed = rudder*2/1000 + 0.01;
    playerHealthMax = Math.pow(2, defense)*100;
    userBoatSpeedCoeff = fasterBoat;
}
function startGame() {
    battlefield.start();
    setUserStats();
    playerBoat = new userBoat(window.innerHeight/5, window.innerHeight/10, boatImageDat, window.innerWidth/2, window.innerHeight*0.7);
    userControls();
    displayHealth();
    enemy1 = new enemyBoat(50, 25, './images/boats/boatFinal/enemy1.png', 200, 200, 100, 0.01);
}

function changeSpeed(speed){
    iSpeed = speed/100 + userBoatSpeedCoeff/4;
    playerBoat.speed = iSpeed;
    changeDirection(playerBoat);
}
function displayHealth(){
    document.getElementById('health').style.width = 100 * playerBoat.health/playerHealthMax + "%";
    document.getElementById('health').innerHTML = playerBoat.health + "/" + playerHealthMax;
    if(playerBoat.health <= 0){
        isDead();
    }
}
function displayEnemyHealth(){
    
}
function userControls(){
    var bod = document.getElementById('innerBorder');
    bod.addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        if((startX >= window.innerWidth/2) && playerBoat.canShoot){
            shoot(playerBoat);
        }
        changeDirection(playerBoat);
    });
    bod.addEventListener("touchmove",function(e) {
        e.preventDefault;
        if(!(startX >= window.innerWidth/2)){
            if(startX < window.innerWidth/4){
                playerBoat.angle += userTurnSpeed;
            }else{
                playerBoat.angle -= userTurnSpeed;
            }
        }
        changeDirection(playerBoat);
    });
    speedSlider = document.getElementById("playerSpeed");
    speedSlider.oninput = function() {
        changeSpeed(this.value);
    } 
}
function enemyBoat(width, height, imageSrc, x, y, enemyHealth, enemyTurnSpeed){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.canShoot = true;
    this.angle = BOAT_270;
    this.health = enemyHealth;
    this.turnSpeed = enemyTurnSpeed;
    this.speed = iSpeed;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = battlefield.context;
        enemyImage.src = imageSrc;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.ImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(enemyImage, -this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.checkCollision = function(){
        cannonShots.forEach(function(element){
            var distance = Math.sqrt(Math.pow(element.x - enemy1.x, 2) + Math.pow(element.y - enemy1.y, 2));
            if(distance < (enemy1.height + element.size/2)){
                enemy1.health -= 20;
                element.active = false;
                //console.log(enemy1.health);
                //displayHealth();
            }
        });
    }
}
function userBoat(width, height, imageSrc, x, y){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.canShoot = true;
    this.angle = BOAT_270;
    this.health = playerHealthMax;
    this.turnSpeed = userTurnSpeed;
    this.speed = iSpeed;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = battlefield.context;
        boatImage.src = imageSrc;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.ImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(boatImage, -this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.checkCollision = function(){
        if(this.x < 20 || this.y < 20 || this.x > window.innerWidth || this.y > window.innerHeight){
            this.health -= 1;
            displayHealth();
        }
    }
}
function cannonShot(size, damage, imageSrc, x, y, range, angle) {
    this.size = size;
    //1.5708 is 90 degrees so cannons shoot perpendically
    this.speedX = Math.cos(angle)*6;
    this.speedY = Math.sin(angle)*6;
    this.x = x;
    this.y = y;    
    this.active = true;
    this.startX = x;
    this.startY = y;
    this.range = range;
    this.update = function(){
        ctx = battlefield.context;
        cannonImage.src = imageSrc;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cannonImage, 0, 0, this.size, this.size);
        ctx.restore();
        if(Math.hypot(this.x-this.startX, this.y-this.startY) > this.range){
            this.active = false;
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}
function shoot(boatObject){
    var degreeOfEnemy = (Math.atan2(enemy1.y - boatObject.y, enemy1.x - boatObject.x) + BOAT_270)%FULL_ROT;
    var degreeOfBoat = (playerBoat.angle +FOURTH_ROT)%FULL_ROT ;
    var degreeOfBoat2 = (degreeOfBoat + PI)%FULL_ROT;
    if((degreeOfEnemy < degreeOfBoat2)&&(degreeOfEnemy > degreeOfBoat)||(degreeOfBoat2 < degreeOfBoat)&&((degreeOfEnemy > degreeOfBoat)||(degreeOfEnemy < degreeOfBoat2))){
       cannonShots.push(new cannonShot(8, 5, './images/untitled.svg', boatObject.x, boatObject.y - 15, 200, boatObject.angle-FOURTH_ROT));
    }
    if(!((degreeOfEnemy < degreeOfBoat2)&&(degreeOfEnemy > degreeOfBoat)||(degreeOfBoat2 < degreeOfBoat)&&((degreeOfEnemy > degreeOfBoat)||(degreeOfEnemy < degreeOfBoat2)))){
       cannonShots.push(new cannonShot(8, 5, './images/untitled.svg', boatObject.x, boatObject.y - 15, 200, playerBoat.angle+FOURTH_ROT));
    }
    boatObject.canShoot = false;
    setTimeout(function(){
        boatObject.canShoot = true;
    }, shootSpeed);
}
function changeDirection(boatObject){
    dXDir = Math.cos(boatObject.angle)*boatObject.speed;
    dYDir = Math.sin(boatObject.angle)*boatObject.speed;
    move(boatObject);
}
function move(boatObject){
    boatObject.speedX = dXDir;
    boatObject.speedY = dYDir;
}
function updateGameArea() {
    battlefield.clear();
    playerBoat.checkCollision();
    playerBoat.newPos();    
    playerBoat.update();
    enemy1.checkCollision();
    enemy1.update();
    cannonShots = cannonShots.filter(function(element) {
        return element.active;
    });
    cannonShots.forEach(function(element){
        element.newPos();
        element.update();
    });
}
function checkAllDestroyed(){
    if(enemyShips.length == 0){
        endOfRound();
    }
}
document.addEventListener('keypress', (event) => {
  const keyName = event.key;
playerBoat.angle += 0.2;
    changeDirection(playerBoat);
  shoot(playerBoat);
});
