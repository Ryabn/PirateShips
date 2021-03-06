var idListGeneral = ['cannonDamage', 'cannonRange', 'rateOfFire', 'shootFast', 'fasterBoat', 'rudder', 'defense'];
var idListSub = [ 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'b1', 'b2', 'b3', 'b4', 'b5', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'e1', 'e2', 'e3', 'e4', 'e5', 'f1', 'f2', 'f3', 'f4', 'g1', 'g2', 'g3', 'g4', 'g5', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var generalSubKeyValuePair = {
    "cannonDamage": "a1",
    "cannonRange": "b1",
    "moreCannons": "c1",
    "rateOfFire": "d1",
    "shootFast": "e1",
    "fasterBoat": "f1",
    "rudder": "g1",
    "defense": "h1",
}
var currentIdGeneral, currentIdSub, price;
function loadCustomize(){
    var subs = document.getElementById('subs').children;
    for (i = 0; i < subs.length; i++) {
        subs[i].style.display = 'none';
    }
    firstTimeLoad();
    changeSelected('cannonDamage');
    displayPlunder();
}
function changeSelected(id){
    for(i = 0; i < idListGeneral.length; i++){
        var change = document.getElementById(idListGeneral[i]).style;
        var changeSub = document.getElementById(idListGeneral[i] + "Sub").style;
        change.backgroundColor  = 'burlywood';
        change.border = '1vw solid black';
        changeSub.display = 'none';
    }
    currentIdGeneral = id;
    change = document.getElementById(id).style;
    changeSub =  document.getElementById(id + "Sub").style;
    changeSub.display = 'block';
    change.backgroundColor  = '#9b805e';
    change.border = '1vw solid grey';
    changeSubSelected(generalSubKeyValuePair[id]);
    
}
function changeSubSelected(id){
    for(i = 0; i < idListSub.length; i++){
        var change = document.getElementById(idListSub[i]).style; 
        change.backgroundColor  = 'burlywood';
        change.border = '1vw solid black';
    }
    change = document.getElementById(id).style;
    change.backgroundColor  = '#9b805e';
    change.border = '1vw solid grey';
    currentIdSub = id;
    changeTextsDescription();   //stats and description
    displayBuyButton();         //buy button
    loadEquipActionDiv(id);     //image
}
function displayPlunder(){
    document.getElementById('displayPlunder').innerHTML = " " + plunder;
}
//display amt of gold user has
function buyItem(){
    plunder -= price;
    window[currentIdGeneral] = parseInt(currentIdSub.replace( /^\D+/g, ''));
    updateInventory();
    updateEquipped();
    strgLocDat.setItem('plunder', plunder);
    closePayment();
    displayBuyButton();
    displayPlunder();
}
//called when user confirms purchase when wrapper pops up
//actual process of buying item
function displayBuyButton(){
    if(inventoryJSON[currentIdGeneral]+1 == parseInt(currentIdSub.replace( /^\D+/g, ''))){
        document.getElementById('equipAction').innerHTML = textDat['general'][currentIdGeneral][0][currentIdSub][2] + " gold";
        document.getElementById('equipAction').style.backgroundColor = null;
    }else if(equippedJSON[currentIdGeneral] == parseInt(currentIdSub.replace( /^\D+/g, ''))){
        document.getElementById('equipAction').innerHTML = "Equipped";
        document.getElementById('equipAction').style.backgroundColor = "green";
    }else if(inventoryJSON[currentIdGeneral] > parseInt(currentIdSub.replace( /^\D+/g, ''))-1){
        document.getElementById('equipAction').innerHTML = "Equip";
        document.getElementById('equipAction').style.backgroundColor = "#5eaf4f";
    }
    else{
        document.getElementById('equipAction').innerHTML = "Locked";
        document.getElementById('equipAction').style.backgroundColor = "grey";
    }
}
//changes buy button (can buy, price, can't buy)
function equipItem(){
    window[currentIdGeneral] = parseInt(currentIdSub.replace( /^\D+/g, ''));
    updateEquipped();
    displayBuyButton();
}
//when user presses equip
function closePayment(){
    document.getElementById('confirmPurchaseWrapper').style.display = 'none';
}
//closes the confirmation wrapper, called when user presses cancel
function loadEquipActionDiv(id){
    document.getElementById('itemsPicture').style.backgroundImage = "url('./images/equipPicture/" + id + ".png')";
}
//displays image of upgrade
//called every time a new sub is selected
function canBuyEquip(){
    price = textDat['general'][currentIdGeneral][0][currentIdSub][2];
    if(document.getElementById('equipAction').innerHTML.valueOf() === "Equip"){
        equipItem();
    }else if(document.getElementById('equipAction').innerHTML.valueOf() === "Equipped"){
        alert("You already have this equipped");
    }else if(document.getElementById('equipAction').innerHTML.valueOf() === "Locked"){
        alert("You must buy/have the previous upgrade before you can buy this upgrade.");
    }else if(plunder >= price){
        document.getElementById('confirmPurchaseWrapper').style.display = 'block';
    }else{
        alert("Ye's got no plunder! Raid some more ships n' I'll get ye what ye needs.");
    }
}
//called when user clicks buy
//tests if they can
function changeTextsDescription(){
    document.getElementById('itemDescription').innerHTML = textDat['general'][currentIdGeneral][0][currentIdSub][0];
    document.getElementById('itemStats').innerHTML = textDat['general'][currentIdGeneral][0][currentIdSub][1];
}
//changes description of text and stats
//should change textDat.js file if words need to be changed