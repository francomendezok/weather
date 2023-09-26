 
//   async function getUserLocation() {
//     try {
//       const response = await fetch('https://ipinfo.io?token=c754c5e436b57a');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error al obtener la ubicación del usuario:', error);
//     }
//   }

//   async function getWeather () {
//     try {
//         const city = await getUserLocation();
//         if (city) {
//             const url = "https://api.weatherapi.com/v1/current.json?key=6c38787677004652bda203136232209&q=" + city.city
//             const weather = await fetch(url)
//             const log = await weather.json();
//             console.log(log);
//         }
//     } catch (error) {
//         console.log(error);
//     }
//   }
  

// getWeather();
