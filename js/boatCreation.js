var boatImage = new Image(), boatCannons = new Image(), boatMast = new Image();
var canvas1, context1, canvas2, context2, canvas3,  context3;

function drawCanvases(){
    canvas1 = document.getElementById('layer1');
    context1 = canvas1.getContext('2d');
    canvas2 = document.getElementById('layer2');
    context2 = canvas2.getContext('2d');
    canvas3 = document.getElementById('layer3');
    context3 = canvas3.getContext('2d');
}
function getImages(){
    drawCanvases();
    drawBoatBase();
}
function getInfo(){
    firstTimeLoad();
    getImages();
}
function drawCannons(){
    boatCannons.src = './images/boats/cannons/cannon' + cannonDamage + '.png';
    context2.mozImageSmoothingEnabled = false;
    context2.webkitImageSmoothingEnabled = false;
    context2.msImageSmoothingEnabled = false;
    context2.imageSmoothingEnabled = false;
    boatCannons.onload = function() {
        context2.drawImage(boatCannons, 90 , 14, 22, 39);
        context1.drawImage(canvas2, 0, 0);
        context2.scale(1, -1);
        context2.drawImage(boatCannons, 90, -106, 22, 39);
        context1.drawImage(canvas2, 0, 0);
        drawMasts();
    }
}
function drawMasts(){
    boatMast.src = './images/boats/masts/mast1.png';
    if(fasterBoat >= 3){
        boatMast.src = './images/boats/masts/mast2.png';
    }
    boatMast.onload = function() {
        addMasts();
        if(fasterBoat == 4){
            boatMast.src = './images/boats/masts/mast3.png';
            boatMast.onload = function() {
                addMasts();
                createBoatImage();
            }
        }
        createBoatImage();
    }
}
function drawBoatBase(){
    boatImage.src = './images/boats/boatBase/h' + defense + '.png';
    context1.mozImageSmoothingEnabled = false;
    context1.webkitImageSmoothingEnabled = false;
    context1.msImageSmoothingEnabled = false;
    context1.imageSmoothingEnabled = false;
    boatImage.onload = function() {
        context1.drawImage(boatImage, 0 ,0 , 200 , 120);
        drawCannons();
    }
    
}
function addMasts(){
    context3.mozImageSmoothingEnabled = false;
    context3.webkitImageSmoothingEnabled = false;
    context3.msImageSmoothingEnabled = false;
    context3.imageSmoothingEnabled = false;
    context3.drawImage(boatMast, -10, 0, 200 , 120);
    context1.drawImage(canvas3, 0, 0);
}
function createBoatImage(){
    strgLocDat.setItem("boatCreated", canvas1.toDataURL());
    document.getElementById('results').src = strgLocDat.getItem("boatCreated");
}
function boatCreated(){
    window.location.replace('index.html');
}
