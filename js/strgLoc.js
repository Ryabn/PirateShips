var strgLocDat = window.localStorage;

var cannonDamage, cannonRange, moreCannons, rateOfFire, shootFast, fasterBoat, rudder, defense, plunder, date;

function firstTimeLoad(){
    if(strgLocDat.getItem('loadBefore') == 1){
        retrieveUserData();
    }else{
        setUserData();
    }
}
function setUserData(){
    strgLocDat.setItem('cannonDamage', 1);
    strgLocDat.setItem('cannonRange', 1);
    strgLocDat.setItem('moreCannons', 1);
    strgLocDat.setItem('rateOfFire', 1);
    strgLocDat.setItem('shootFast', 1);
    strgLocDat.setItem('fasterBoat', 1);
    strgLocDat.setItem('rudder', 1);
    strgLocDat.setItem('defense', 1);
    strgLocDat.setItem('plunder', 500);
    var d = new Date();
    strgLocDat.setItem('dateLogged', d.getDate());
    strgLocDat.setItem('loadBefore', 1);
    retrieveUserData();
}
function retrieveUserData(){
    cannonDamage = strgLocDat.getItem('cannonDamage');
    cannonRange = strgLocDat.getItem('cannonRange');
    moreCannons = strgLocDat.getItem('moreCannons');
    rateOfFire = strgLocDat.getItem('rateOfFire');
    shootFast = strgLocDat.getItem('shootFast');
    fasterBoat = strgLocDat.getItem('fasterBoat');
    rudder = strgLocDat.getItem('rudder');
    defense = strgLocDat.getItem('defense');
    plunder = strgLocDat.getItem('plunder'); 
    plunder = parseInt(plunder);
    date = strgLocDat.getItem('dateLogged');
}