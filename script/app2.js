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



let marker;
let pathCoords;
var mymap;


function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position){    
        lat = position.coords.latitude;
        long = position.coords.longitude;

        console.log(lat);
        console.log(long);
        pathCoords = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apikey}`
        const path = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=${apikey}`


        var myIcon = L.icon({
            iconUrl: "./img/user.png",
            iconSize: [56, 56],
            iconAnchor: [25, 16],
        });
     

        mymap = L.map('map').setView([lat, long], 14);
        L.tileLayer.provider('OpenStreetMap').addTo(mymap);
        marker = L.marker([lat, long], {icon: myIcon}).addTo(mymap);
        
        /*  L.marker([lat, long]).addTo(mymap);*/
        //marker.setLatLng([lat, long])
        fetch(pathCoords).then(r => r.json()).then(data => verwerkData(data));
        mymap.on('click', onMapClick);
        

    });
};

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        //.setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
        console.log(e.latlng.lat)
        
        var floatlng = parseFloat(e.latlng.lng);
        console.log(floatlng)
        console.log(typeof floatlng)
        var pathCoords2 = `http://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&units=metric&appid=${apikey}`
        fetch(pathCoords2).then(r => r.json()).then(data => verwerkData2(data));
}

function verwerkData2(data){
    console.log(data);
    let description = data.weather[0].description;
    icon = data.weather[0].icon;
    //console.log(icon);
    console.log(description) 
    let temp =  Math.round(data.main.temp);



    let HTML="";
    HTML += `
    <span id="icon" class="c-icon">
        ${description }
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${icon}" class="c-icon" height="42" width="42">
    </span> `
    //document.getElementById("icon").innerHTML = HTML;
    /* var customPopup = `<p class="c-Ppopup">${temp}°C</p><img src='http://openweathermap.org/img/wn/${icon}@2x.png' class="c-popup__image" alt='maptime logo gif'/>
    <br/> <h3 class="c-popup">${description}</h3> `; */

    /* var customPopup = `<div class="content"><img src='http://openweathermap.org/img/wn/${icon}@2x.png' class="item-a" alt='maptime logo gif'/><h3>Title</h3>
    <p>Some Description</p></div>`; */

    var customPopup = `
    <div class="pop-up">
        <div class="wrapper">
            <img class="sidebar" src='http://openweathermap.org/img/wn/${icon}@2x.png'/>
            <article class="content">
                <h1 class="c-h1">${temp}°C</h1>
                <h3 class="c-h1">${description}</h3>
            </article>
        </div>
    </div>`;
    //var customPopup = ``;


    //marker.bindPopup(`<b>${description}</b><br>I am a popup.`).openPopup();
    popup.setContent(customPopup).openPopup();
};


function showmap(){
    var mymap = L.map('map').setView([0, 0], 14);
    L.tileLayer.provider('OpenStreetMap').addTo(mymap);
    getLocation();
}





var customOptions =
        {
        'maxWidth': '500',
        'className' : 'custom',
        'closeButton' : false
        }
function verwerkData(data){
    console.log(data);
    let description = data.weather[0].description;
    icon = data.weather[0].icon;
    //console.log(icon);
    console.log(description) 
    let temp =  Math.round(data.main.temp);



    let HTML="";
    HTML += `
    <span id="icon" class="c-icon">
        ${description }
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${icon}" class="c-icon" height="42" width="42">
    </span> `
    //document.getElementById("icon").innerHTML = HTML;
    /* var customPopup = `<p class="c-Ppopup">${temp}°C</p><img src='http://openweathermap.org/img/wn/${icon}@2x.png' class="c-popup__image" alt='maptime logo gif'/>
    <br/> <h3 class="c-popup">${description}</h3> `; */

    /* var customPopup = `<div class="content"><img src='http://openweathermap.org/img/wn/${icon}@2x.png' class="item-a" alt='maptime logo gif'/><h3>Title</h3>
    <p>Some Description</p></div>`; */

    var customPopup = `<div class="wrapper">
    <img class="sidebar" src='http://openweathermap.org/img/wn/${icon}@2x.png'/>
    <article class="content">
      <h1 class="c-h1">${temp}°C</h1>
      <h3 class="c-h1">${description}</h3>
    </article>
  </div>`;
    //var customPopup = ``;


    //marker.bindPopup(`<b>${description}</b><br>I am a popup.`).openPopup();
    marker.bindPopup(customPopup,customOptions).openPopup();
    
};

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    
    //getWeather(path)
    //  showmap();
    //getLocation();
    //showmap();
    getLocation();
    

    //getmap();
});


