 
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
    const temperatureF = document.getElementById('temperature-fahrenheit');
    const title = document.getElementById('title');
    const flagIMG = document.getElementById('flag');
    title.textContent =  `${data.location.name}, ${data.location.country}` ;
    flagIMG.src = flag;
    
    cityName.textContent = data.location.name;
    hour.textContent = localTime[1];
    temperature.textContent = `${data.current.temp_c} Celsius`;
    temperatureF.textContent = `${data.current.temp_f} Fahrenheit`;
    img.src = src;
    condition.textContent = await data.current.condition.text;
  }
  
renderWeather();


const submit = document.getElementById('submit');
const searchInput = document.getElementById('search-input');
submit.addEventListener('click', event => {
    event.preventDefault();
    renderWeather(searchInput.value);
})