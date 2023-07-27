const form = document.getElementById('form')
const search = document.getElementById('search')

function searchWeather(item){
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let img = document.querySelector('.img');

    const api= `https://api.weatherapi.com/v1/current.json?key=d9ab070affb849e8ba4222729230407&q=${item}&aqi=no`
// 
    fetch(api).then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const {temp_c}= data.current;
                const {text} = data.current.condition;
                //set dom elements from Api

                temperatureDegree.textContent = temp_c + '   Celcius';
                temperatureDescription.textContent= text;      
                locationTimezone.textContent = data.location.tz_id;
                //icon. = data.current.condition.icon;
                //change the attricbute 'src' of img tag in html 
                img.src = "https:"+ data.current.condition.icon;
    })

}

function loadDefaultWeather(){
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let img = document.querySelector('.img');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            //console.log(position); chck console for details on coordinates of your location 
            long = position.coords.longitude; 
            lat = position.coords.latitude;

            const api= `https://api.weatherapi.com/v1/current.json?key=d9ab070affb849e8ba4222729230407&q=${lat},${long}&aqi=no`

            fetch(api).then(response => {
                return response.json();
            }) 
            .then(data =>{
                console.log(data);
                const {temp_c}= data.current;
                const {text} = data.current.condition;
                //set dom elements from Api

                temperatureDegree.textContent = temp_c + '   Celcius';
                temperatureDescription.textContent= text;      
                locationTimezone.textContent = data.location.tz_id;
                //icon. = data.current.condition.icon;
                //change the attricbute 'src' of img tag in html 
                img.src = "https:"+ data.current.condition.icon;
            });
        });        
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const term = search.value;

    console.log(term);
    
    if(term && term !== '') {
        searchWeather(term)

        search.value = ''
    } else {
        window.location.reload()
    }
})

document.addEventListener("DOMContentLoaded", loadDefaultWeather);

    // Call the getWeather function periodically to fetch updated data
setInterval(getWeather, 600000); // Refresh every 10 minutes