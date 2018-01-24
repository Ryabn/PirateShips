function getFreeDailyGold(){
    var d = new Date();
    if(!(d.getDate() == date)){
        plunder += 100;
        strgLocDat.setItem('plunder', plunder);
        date = d.getDate();
        alert("Here yar go! Have 100 free gold. Come back tomorrow for more free gold");
    }else{
        alert("You can only get the daily loot once a day!");
    }
}
function buyGold(){
    alert("This function isn't available yet.");
}