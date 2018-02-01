var playerBoat;
var cannon;
var playerBoatAngle = 4.712396, iSpeed = 1, turnSpeed = 0.01;
var boatImage = new Image(), cannonImage = new Image();
var cannonShots = [], enemyShips = [];
var startX, startY, playerHealthMax, playerHealth;
var speedSlider;
var boatImageDat = strgLocDat.getItem("boatCreated");


var battlefield = {
    canvas : document.createElement("canvas"),
    start: function() {
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 5;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 30);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function setUserStats(){
    turnSpeed+= rudder*5/1000;
    playerHealth = playerHealthMax = Math.pow(2, defense)*100;
}
function startGame() {
    battlefield.start();
    userControls();
    playerBoat = new boat(window.innerHeight/5, window.innerHeight/10, boatImageDat, window.innerWidth/2, window.innerHeight*0.7);
    setUserStats();
    displayHealth();
}
function changeSpeed(speed){
    iSpeed = speed/100;
    changeDirection();
}
function displayHealth(){
    document.getElementById('health').style.width = 100*playerHealth/playerHealthMax + "%";
    document.getElementById('health').innerHTML = playerHealth + "/" + playerHealthMax;
}
function userControls(){
    var bod = document.getElementById('innerBorder');
    bod.addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        if(startX >= window.innerWidth/2){
            shoot();
        }
        changeDirection();
    });
    bod.addEventListener("touchmove",function(e) {
        e.preventDefault;
        if(!(startX >= window.innerWidth/2)){
            if(startX < window.innerWidth/4){
                playerBoatAngle += turnSpeed;
            }else{
                playerBoatAngle -= turnSpeed;
            }
        }
        changeDirection();
    });
    speedSlider = document.getElementById("playerSpeed");
    speedSlider.oninput = function() {
        changeSpeed(this.value);
    } 
}
function boat(width, height, imageSrc, x, y){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function(dBoatAngle){
        ctx = battlefield.context;
        boatImage.src = imageSrc;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(dBoatAngle);
        ctx.mozImageSmoothingEnabled = false;
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
            playerHealth -= 1;
            displayHealth();
        }
    }
    this.getX = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
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
function dead(){
    endOfRound(true);
    document.body.style.backgroundColor = '#ce3939';
}
function shoot(){
    cannonShots.push(new cannonShot(16, 5, '.images/untitled.svg', playerBoat.getX(), playerBoat.getY() - 15, 200, playerBoatAngle+1.5708));
    cannonShots.push(new cannonShot(16, 5, 'http://dairypark.ryanqyang.tech/images/untitled.svg', playerBoat.getX(), playerBoat.getY() - 15, 200, playerBoatAngle-1.5708));
}
function changeDirection(){
    dXDir = Math.cos(playerBoatAngle)*iSpeed;
    dYDir = Math.sin(playerBoatAngle)*iSpeed;
    move();
}
function move(){
    playerBoat.speedX = dXDir;
    playerBoat.speedY = dYDir;
}
function updateGameArea() {
    battlefield.clear();
    playerBoat.checkCollision();
    playerBoat.newPos();    
    playerBoat.update(playerBoatAngle);
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