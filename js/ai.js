function determineNewPath(enemyBoatObject){
    changeDirection(enemyBoatObject);
}
function animateIntoMap(enemyBoatObject){
    enemyBoatObject.speedY = 1;
    setTimeout(function(){
        determineNewPath(enemyBoatObject);
    }, (Math.floor(Math.random() * 2000) + 3000));
}
function generateEnemyCoordinatesX(){
    var x = Math.floor(Math.random() * Math.floor(window.innerWidth*0.8)) + window.innerWidth*0.1;
    return x;
}
function generateEnemyCoordinatesY(){
    var y = -1*(Math.floor(Math.random() * Math.floor(window.innerHeight*0.3)));
    return y;
}
function enemyBoat(width, height, imageSrc, x, y, enemyHealth, enemyTurnSpeed){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.canShoot = true;
    this.angle = FOURTH_ROT;
    this.health = enemyHealth;
    this.turnSpeed = enemyTurnSpeed;
    this.speed = iEnemySpeed;
    this.active = true;
    this.x = x;
    this.y = y;   
    this.angleToReach = 1.57;
    this.needTurn = false;
    this.xDest = 0;
    this.yDest = 0;
    this.update = function(){
        if(this.health <= 0){
            this.active = false;
        }
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
        var eX = this.x;
        var eY = this.y;
        var eH = this.height;
        var eHit = false;
        var cDmg;
        cannonShots.forEach(function(element){
            var distance = Math.sqrt(Math.pow(element.x - eX, 2) + Math.pow(element.y - eY, 2));
            if(distance < (eH + element.size/2)){
                eHit = true;
                cDmg = element.dmg;
                element.active = false;
            }
        });
        if(eHit){
            this.health -= cDmg;
        }
        if((this.x < playerBoat.x + 30) && (this.x > playerBoat.x-30)){
            if((this.y < playerBoat.y + 30) && (this.y > playerBoat.y-30)){
                this.active = false;
                playerBoat.health -= iEnemyDamage;
                displayHealth();
            }
        }
    }
    this.tiltMore = function(){
        this.angle%=FULL_ROT;
        this.angleToReach = Math.atan2( playerBoat.y - this.y,  playerBoat.x - this.x);
        if(!(this.angle > this.angleToReach - 0.1 && this.angle < this.angleToReach + 0.1)){
            if((this.angle > this.angleToReach) && !(this.angle%FULL_ROT-this.angleToReach > PI)){
                this.angle -= this.turnSpeed;
            }else{
                this.angle += this.turnSpeed;
            }
            changeDirection(this);
        }
    }
}
function enemyCannonShot(size, damage, imageSrc, x, y, range, angle) {
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
function checkAllDestroyed(){
    if(enemyShips.length == 0){
        endOfRound();
    }
}