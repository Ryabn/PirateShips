var aIntOL, aIntIL;
var num = 15, num2 = 115;

function nextCampaign(){
    
}
function prevCampaign(){
    
}
function animateOutLeft(){
    
    aIntOL = setInterval(animOL, 5);
}
function animateInLeft(){
    aIntIL = setInterval(animIL, 5);
}
function animOL(){
    if(num < -115){
        clearInterval(aIntOL);
    }
    num -= 1;
    document.getElementById('levelSelected').style.left = num + "vw";
}
function animIL(){
    if(num2 <= 16){
        clearInterval(aIntIL);
    }
    num2 -= 1;
    document.getElementById('levelSelected2').style.left = num2 + "vw";
}