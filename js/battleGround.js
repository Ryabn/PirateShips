var cannon;
var cannonImage = new Image(), enemyImage = new Image();
var cannonShots = [], enemyShips = [];
var speedSlider;
const FOURTH_ROT = 1.571, PI = 3.141,  BOAT_270 = 4.712, FULL_ROT = 6.283;

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
function startGame() {
    battlefield.start();
    setUserStats();
    playerBoat = new userBoat(window.innerHeight/5, window.innerHeight/10, boatImageDat, window.innerWidth/2, window.innerHeight*0.7);
    userControls();
    displayHealth();
    generateEnemies();
}
function cannonShot(size, damage, imageSrc, x, y, range, angle) {
    this.size = size;
    //1.5708 is 90 degrees so cannons shoot perpendically
    this.speedX = Math.cos(angle)*6;
    this.speedY = Math.sin(angle)*6;
    this.x = x;
    this.y = y;    
    this.dmg = damage;
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
    enemyShips.forEach(function(element){
        var degreeOfEnemy = (Math.atan2(element.y - boatObject.y, element.x - boatObject.x) + BOAT_270)%FULL_ROT;
        var degreeOfBoat = (playerBoat.angle +FOURTH_ROT)%FULL_ROT ;
        var degreeOfBoat2 = (degreeOfBoat + PI)%FULL_ROT;
        if((degreeOfEnemy < degreeOfBoat2)&&(degreeOfEnemy > degreeOfBoat)||(degreeOfBoat2 < degreeOfBoat)&&((degreeOfEnemy > degreeOfBoat)||(degreeOfEnemy < degreeOfBoat2))){
           cannonShots.push(new cannonShot(8, pDmg, './images/untitled.svg', boatObject.x, boatObject.y - 15, pRange, boatObject.angle-FOURTH_ROT));
        }
        if(!((degreeOfEnemy < degreeOfBoat2)&&(degreeOfEnemy > degreeOfBoat)||(degreeOfBoat2 < degreeOfBoat)&&((degreeOfEnemy > degreeOfBoat)||(degreeOfEnemy < degreeOfBoat2)))){
           cannonShots.push(new cannonShot(8, pDmg, './images/untitled.svg', boatObject.x, boatObject.y - 15, pRange, playerBoat.angle+FOURTH_ROT));
        }
    });
    boatObject.canShoot = false;
    setTimeout(function(){
        boatObject.canShoot = true;
    }, shootSpeed);
}
function changeDirection(boatObject){
    boatObject.speedX = Math.cos(boatObject.angle)*boatObject.speed;
    boatObject.speedY = Math.sin(boatObject.angle)*boatObject.speed;
}
function updateGameArea() {
    battlefield.clear();
    playerBoat.checkCollision();
    playerBoat.newPos();    
    playerBoat.update();
    enemyShips = enemyShips.filter(function(element){
        return element.active;
    });
    checkAllDestroyed();
    enemyShips.forEach(function(element){
        element.checkCollision();
        element.update();
        element.newPos();
        element.tiltMore();
    });
    cannonShots = cannonShots.filter(function(element) {
        return element.active;
    });
    cannonShots.forEach(function(element){
        element.newPos();
        element.update();
    });
}

/*
document.addEventListener('keypress', (event) => {
  const keyName = event.key;
playerBoat.angle += 0.2;
    changeDirection(playerBoat);
  shoot(playerBoat);
});
*/