var strgLocDat = window.localStorage;

var cannonDamage, cannonRange, moreCannons, rateOfFire, shootFast, fasterBoat, rudder, defense, plunder, date, equippedJSON, inventoryJSON;

var baseItemsJSON = {
    "cannonDamage" : 5,
    "cannonRange" : 1,
    "moreCannons" : 1,
    "rateOfFire" : 1,
    "shootFast" : 1,
    "fasterBoat" : 4,
    "rudder" : 1,
    "defense" : 1
}

function firstTimeLoad(){
    if(strgLocDat.getItem('loadBefore') == 1){
        retrieveUserData();
    }else{
        setUserData();
    }
}
function setUserData(){
    strgLocDat.setItem('inventory', JSON.stringify(baseItemsJSON));
    strgLocDat.setItem('equipped', JSON.stringify(baseItemsJSON));
    strgLocDat.setItem('plunder', 500);
    strgLocDat.setItem('dateLogged', 0);
    strgLocDat.setItem('loadBefore', 1);
    retrieveUserData();
}
function retrieveUserData(){
    equippedJSON = JSON.parse(strgLocDat.getItem('equipped'));
    inventoryJSON = JSON.parse(strgLocDat.getItem('inventory'));
    cannonDamage = equippedJSON["cannonDamage"];
    cannonRange = equippedJSON["cannonRange"];
    moreCannons = equippedJSON["moreCannons"];
    rateOfFire = equippedJSON["rateOfFire"];
    shootFast = equippedJSON["shootFast"];
    fasterBoat = equippedJSON["fasterBoat"];
    rudder = equippedJSON["rudder"];
    defense = equippedJSON["defense"];
    plunder = parseInt(strgLocDat.getItem('plunder')); 
    date = strgLocDat.getItem('dateLogged');
}
function updateEquipped(){
    equippedJSON["cannonDamage"] = cannonDamage;
    equippedJSON["cannonRange"] = cannonRange;
    equippedJSON["moreCannons"] = moreCannons;
    equippedJSON["rateOfFire"] = rateOfFire;
    equippedJSON["shootFast"] = shootFast;
    equippedJSON["fasterBoat"] = fasterBoat;
    equippedJSON["rudder"] = rudder;
    equippedJSON["defense"] = defense;
    strgLocDat.setItem('equipped', JSON.stringify(equippedJSON));
}
function updateInventory(){
    inventoryJSON["cannonDamage"] = cannonDamage;
    inventoryJSON["cannonRange"] = cannonRange;
    inventoryJSON["moreCannons"] = moreCannons;
    inventoryJSON["rateOfFire"] = rateOfFire;
    inventoryJSON["shootFast"] = shootFast;
    inventoryJSON["fasterBoat"] = fasterBoat;
    inventoryJSON["rudder"] = rudder;
    inventoryJSON["defense"] = defense;
    strgLocDat.setItem('inventory', JSON.stringify(inventoryJSON));
}