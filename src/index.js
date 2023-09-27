  function getDates() {
  const today = new Date();
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const nextDayAfterTomorrow = new Date(today);
  nextDayAfterTomorrow.setDate(today.getDate() + 3);

  const dates = [today, tomorrow, dayAfterTomorrow, nextDayAfterTomorrow];
  const newDates = dates.map(day => day.toLocaleDateString('en-US', { weekday: 'long' }));
  return newDates
  }
  async function getUserLocation() {
    try {
      const response = await fetch('https://ipinfo.io?token=c754c5e436b57a');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la ubicación del usuario:', error);
    }
  }

  async function getWeather (search) {
    try {
        if (search) {
            const url = "https://api.weatherapi.com/v1/forecast.json?key=6c38787677004652bda203136232209&q=" + search
            const weather = await fetch(url)
            const data = await weather.json();
            return data;
        } else {
            const city = await getUserLocation();
            if (city) {
                const url = "https://api.weatherapi.com/v1/forecast.json?key=6c38787677004652bda203136232209&q=" + city.city
                const weather = await fetch(url)
                const data = await weather.json();
                return data;
            }
        }
    } catch (error) {
        alert('Please type a real location');
        console.log(error);
    }
  }

  async function getFlag (country) {
    const url = "https://restcountries.com/v3.1/name/" + country;
    const response = await fetch(url);
    const data = await response.json();
    const flag = data[0].flags.png;
    return flag;
  }

  async function renderWeather (city) {
    const data = await getWeather(city);
    const flag = await getFlag(data.location.country);

    const src =  await data.current.condition.icon;
    const img = document.getElementById('img-weather');
    const cityName = document.getElementById('city');
    const hour = document.getElementById('hour');
    const fullHour = data.location.localtime;
    const localTime = fullHour.split(' ');
    const condition = document.getElementById('condition');
    const temperature = document.getElementById('temperature');
    const maxMin = document.getElementById('temperature-max-min');
    const title = document.getElementById('title');
    const flagIMG = document.getElementById('flag');
    const favicon = document.querySelector("link[rel*='icon']")


    title.textContent =  `${data.location.name}, ${data.location.country}` ;
    flagIMG.src = flag;
    favicon.href = flag;
    document.title = data.location.name;
    cityName.textContent = data.location.name;
    hour.textContent = localTime[1];
    temperature.textContent = `${data.current.temp_c} Celsius`;
    maxMin.textContent = `Max: ${data.forecast.forecastday[0].day.maxtemp_c}, Min: ${data.forecast.forecastday[0].day.mintemp_c}`;
    img.src = src;
    condition.textContent = await data.current.condition.text;
  }
  
  async function renderForecast (city) {
    const data = await getWeather(city);
    const week = getDates();
    week[0] = 'Today';
    const days = document.querySelectorAll('.next-days');
    const arr = [...days];

    for (let i = 0; i < 3; i++) {
      arr[i].textContent = week[i];
    }
  }


  
  
const submit = document.getElementById('submit');
const searchInput = document.getElementById('search-input');
submit.addEventListener('click', event => {
  event.preventDefault();
  renderWeather(searchInput.value);
})




// Handle error with better design and UI when searching //
// Forecast Section // 
// Charge Loader untill the promise is ready // 
// Design Input and submit // 
// Media Queries // 


renderWeather();
renderForecast();