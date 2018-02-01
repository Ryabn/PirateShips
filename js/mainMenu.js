function promptInternetAccess(){
    document.getElementById('needInternet').innerHTML = "<img style=\"display: none\" src=\"https://ryabn.github.io/images/logos/google-play-badge.png\" onerror=\"noInternet()\" onload=\"hasInternet()\"/>";
    
}
function noInternet(){
    alert("To access these functions, you need to be connected to the internet.");
}
function hasInternet(){
    window.location.href = 'getGold.html';
}