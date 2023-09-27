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
          const searchInput = document.getElementById('search-input');
            const url = "https://api.weatherapi.com/v1/forecast.json?key=6c38787677004652bda203136232209&days=3&q=" + search
            const weather = await fetch(url);
            if (weather.status !== 400) {
              searchInput.placeholder = 'Search Location';
              const data = await weather.json();
              return data;
            }
            else {
              searchInput.placeholder = 'City not found 😕';
            };
        } else {
            const city = await getUserLocation();
            if (city) {
                const url = "https://api.weatherapi.com/v1/forecast.json?key=6c38787677004652bda203136232209&days=3&q=" + city.city
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
    const maxs = document.querySelectorAll('.max');
    const mins = document.querySelectorAll('.min');
    const imgs = document.querySelectorAll('.day-img');


    const arrDays = [...days];
    const forecast = data.forecast.forecastday;

    console.log(forecast);
    for (let i = 0; i < 3; i++) {
      arrDays[i].textContent = week[i];
      maxs[i].textContent = forecast[i].day.maxtemp_c;
      mins[i].textContent = forecast[i].day.mintemp_c;
      imgs[i].src = forecast[i].day.condition.icon;
    }
  }

  async function renderData() {
    try {
      const weatherPromise = await renderWeather();
      const forecastPromise = await renderForecast();
    } catch (error) {
      console.error(error);
    }
  }
  
  
  const submit = document.getElementById('submit');
  const searchInput = document.getElementById('search-input');
  submit.addEventListener('click', event => {
  event.preventDefault();
  renderWeather(searchInput.value);
  renderForecast(searchInput.value);
  searchInput.value = '';
  });


  renderData();


