const apikey = "1f5474241da879a0e9c1f1912a354716"
const path = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=${apikey}`
let long
let lat



function getData(path){
    fetch(path).then((res) => {
        return res.json()
    }).then((json) => {
        console.log(json)
    }).catch((err) => {
        console.log(err.message)
    })
}






function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position){    
        lat = position.coords.latitude;
        long = position.coords.longitude;

        console.log(lat);
        console.log(long);
        let pathCoords = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apikey}`
        


        var myIcon = L.icon({
            iconUrl: "./img/user.png",
            iconSize: [56, 56],
            iconAnchor: [25, 16],
        });
     

        var mymap = L.map('map').setView([lat, long], 14);
        L.tileLayer.provider('OpenStreetMap').addTo(mymap);
        const marker = L.marker([lat, long], {icon: myIcon}).addTo(mymap);
        /*  L.marker([lat, long]).addTo(mymap);*/
        //marker.setLatLng([lat, long])
        fetch(pathCoords).then(r => r.json()).then(data => verwerkData(data));

        mymap.on('click', onMapClick);
        

    });
};

function showmap(){
    var mymap = L.map('map').setView([0, 0], 14);
    L.tileLayer.provider('OpenStreetMap').addTo(mymap);
    getLocation();
}


function verwerkData(data){
    console.log(data);
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;
    console.log(icon);
    console.log(description) 



    let HTML="";
    HTML += `
    <span id="icon" class="c-icon">
        ${description }
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${icon}" class="c-icon" height="42" width="42">
    </span> `
    document.getElementById("icon").innerHTML = HTML;
    return icon;
};


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}



document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    
    //getWeather(path)
    //showmap();
    //getLocation();
    //showmap();
    getLocation();
    

    //getmap();
});

