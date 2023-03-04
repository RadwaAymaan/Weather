let searchInput = document.getElementById('search');
let day = document.querySelector('.day');
let date = document.querySelector('.date');
let content = document.querySelectorAll('.forecast-content');
let today = document.querySelector('.today .num');
let forecastTable = document.getElementById('forecast');
let forecastClass = document.querySelector('.forecast')

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
//  for(let i =0;i<=day.length;i++){
//  day[i].textContent = `${days[new Date().getDay()+i]}`
//  }
//  date.textContent =`${new Date().getDate()} 
//  ${months[new Date().getMonth()]}` 
//  function getDay(day){
//   switch (day) {
//       case 0:
//        return day = "Sunday";
//       case 1:
//        return day = "Monday";
//       case 2:
//        return day = "Tuesday";
//       case 3:
//        return day = "Wednesday";
//       case 4:
//        return day = "Thursday";
//       case 5:
//        return day = "Friday";
//       case 6:
//        return day = "Saturday";
// }
// };

 async function searchCountry(country){
  let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6091233d2d9a496187f214501230303&q=${country}&days=3`);
  if(apiResponse.ok && apiResponse.status !=400){
  let finalResult = await apiResponse.json();
  displayToday(finalResult.location,finalResult.current);
  display(finalResult.forecast.forecastday);
  // let container = ``;
  //     container += 
  //     `
  //     \t<div class="location">${finalResult.location.name}</div>\n <div class="degree"><div class="num">${finalResult.current.temp_c}<sup>o</sup>C</div>\n <div class="forecast-icon">\n <img src="https:${finalResult.current.condition.icon}" alt="" width=90>\n </div>\n  </div>\n <div class="custom">${finalResult.current.condition.text}</div>\n </div>\n </div>
  //   <span><img src="./images/icon-umberella.png" alt="" width="21" height="21">20%</span>\n
	// 							<span><img src="./images/icon-wind.png" alt="" width="23" height="21">18km/h</span>\n
	// 							<span><img src="./images/icon-compass.png" alt="" width="21" height="21">East</span>\n`
   
  // //  console.log(finalResult);
  //  document.getElementById('current').innerHTML = container;

  
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
// searchCountry('cairo');
searchInput.addEventListener('input',function(eventInfo){
  searchCountry(`${eventInfo.target.value}`);
})