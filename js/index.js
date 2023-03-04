let searchInput = document.getElementById('search');
let forecastTable = document.getElementById('forecast');


 const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
 'December'];
 let days = ["Sunday","Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
 async function searchCountry(country){
  let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6091233d2d9a496187f214501230303&q=${country}&days=3`);
  if(apiResponse.ok && apiResponse.status !=400){
  let finalResult = await apiResponse.json();
  displayToday(finalResult.location,finalResult.current);
  display(finalResult.forecast.forecastday);
  
  
  }
  

}
function displayToday(location,current){
  let date = new Date(current.last_updated);
  let todayContainer = ``;
    todayContainer += `
            <div class="today forecast">
            <div id="today" class="forecast-header">
                <div class="day">${days[date.getDay()]}</div>
                <div class="date">${date.getDate()+months[date.getMonth()]}</div>
                <div class="crl"></div>
            </div>
            <div id="current" class="forecast-content">
                <div class="location">${location.name}</div>
                <div class="degree">
                    <div class="num">
                        ${current.temp_c}
                        <sup>o</sup>
                        C
                    </div>
                    <div class="forecast-icon">
                    <img src="https:${current.condition.icon}" width="90" alt="">
                </div>
                </div>
                <div class="custom">${current.condition.text}</div>
                <span><img src="./images/icon-umberella.png" alt="">
                20%</span>
                <span><img src="./images/icon-wind.png" alt="">
                18km/h</span>
                <span><img src="./images/icon-compass.png" alt="">
                    East
                </span>
            </div>
        </div>`;

        forecastTable.innerHTML = todayContainer;
}
function display(forecast){
  let container = ``;
  for(let i=1;i<forecast.length;i++){
    container+=`
    <div class="forecast">
    <div class="forecast-header">
    <div class="day">${days[new Date(forecast[i].date).getDay()]}</div>
     </div> 
    <div class="forecast-content">
    <div class="forecast-icon">
    <img src="https:${forecast[i].day.condition.icon}" alt="" width=48>\n </div>
     <div class="degree">${forecast[i].day.maxtemp_c}<sup>o</sup>C</div>
    <small>${forecast[i].day.mintemp_c}<sup>o</sup></small>\n 
    <div class="custom">${forecast[i].day.condition.text}</div>\n </div>\n </div>`
  }
  forecastTable.innerHTML += container;
}
searchCountry('cairo');
searchInput.addEventListener('input',function(eventInfo){
  searchCountry(`${eventInfo.target.value}`);
})