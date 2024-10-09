let apiKey = "611a8a5484b029bb547a7c6c09b22f13";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

async function getWeather(city) {
  try {
    let response = await fetch(apiURL + city);
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }
    if (!response.ok) {
      throw new Error("City not found");
    }
    let data = await response.json();
    console.log(data);
    document.getElementById("temperature").innerHTML = data.main.temp + "°C";
    document.getElementById("location").innerHTML = data.name;
    document.querySelector(".humidityIcon").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".windIcon").innerHTML = data.wind.speed + " Km/h";
    let weatherSection = document.querySelector(".weather");
    weatherSection.style.display = "block";
    let weatherImage = document.getElementById("weatherImage");
    // Using a mapping to simplify weather conditions
    const weatherImages = {
      Clouds: "image/clouds.png",
      Clear: "image/clear.png",
      Drizzle: "image/drizzle.png",
      Mist: "image/mist.png",
      Rain: "image/rain.png",
      Snow: "image/snow.png",
    };

    weatherImage.src = weatherImages[data.weather[0].main] || "image/clear.png"; // Fallback image
  } catch (error) {
    console.error(error);
    alert("Error fetching weather data: " + error.message);
  }
}

let searchInput = document.querySelector("#searchInput");
let searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("click", function () {
  getWeather(searchInput.value);
});
