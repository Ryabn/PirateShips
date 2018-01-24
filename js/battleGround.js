var playerBoat;
var cannon;
var playerBoatAngle = 4.712396;
var iSpeed = 1;
var boatImage = new Image();
var cannonImage = new Image();
var cannonShots = [];
var startX, startY;

function startGame() {
    battlefield.start();
    var bod = document.body;
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
                playerBoatAngle += 0.01;
            }else{
                playerBoatAngle -= 0.01;
            }
        }
        iSpeed = (window.innerHeight - e.touches[0].clientY) / 200;
        changeDirection();
    });
    playerBoat = new boat(128, 64, 'http://www.dairypark.ryanqyang.tech/images/ship.png', window.innerWidth/2, window.innerHeight-128);
}
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
        ctx.drawImage(boatImage,-this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.checkCollision = function(){
        if(this.x < 20 || this.y < 20 || this.x > window.innerWidth || this.y > window.innerHeight){
            dead();
        }else{
            document.body.style.backgroundColor = null;
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
    document.body.style.backgroundColor = '#ce3939';
}
function shoot(){
    cannonShots.push(new cannonShot(16, 5, 'http://dairypark.ryanqyang.tech/images/untitled.svg', playerBoat.getX(), playerBoat.getY() - 15, 200, playerBoatAngle+1.5708));
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