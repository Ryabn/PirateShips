var userBoatSpeedCoeff, iSpeed = 1, pDmg, pRange, startX, startY, playerHealthMax;
var playerBoat;
var boatImage = new Image();
var userTurnSpeed;
var shootSpeed = 1000;
var boatImageDat = strgLocDat.getItem("boatCreated");

function setUserStats(){
    userTurnSpeed = rudder*2/1000 + 0.01;
    playerHealthMax = Math.pow(2, defense)*100;
    userBoatSpeedCoeff = fasterBoat;
    pDmg = textDat['general']['cannonDamage'][0]["a" + cannonDamage][3];
    pRange = textDat['general']['cannonRange'][0]["b" + cannonRange][3];
}
function changeSpeed(speed){
    iSpeed = speed/100 * userBoatSpeedCoeff;
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