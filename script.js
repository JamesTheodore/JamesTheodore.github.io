document.addEventListener("DOMContentLoaded", () => {
    updateClock();
    setInterval(updateClock, 1000);
    fetchWeather();
    fetchNews();
    fetchQuote();
});

function updateClock() {
    document.getElementById("time").innerText = new Date().toLocaleTimeString();
}

function fetchWeather() {
    fetch("https://api.weatherapi.com/v1/current.json?key=6062b2c3a70844f2922544c2b114fda7&q=auto:ip")
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather-data").innerText = `${data.location.name}: ${data.current.temp_c}°C, ${data.current.condition.text}`;
    })
    .catch(() => document.getElementById("weather-data").innerText = "Error fetching weather");
}

function fetchNews() {
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=fea3f7a67e09476fbb2557748cd66ca6")
    .then(response => response.json())
    .then(data => {
        let newsList = document.getElementById("news-list");
        newsList.innerHTML = "";
        data.articles.slice(0, 5).forEach(article => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
            newsList.appendChild(li);
        });
    })
    .catch(() => document.getElementById("news-list").innerText = "Error fetching news");
}

function fetchQuote() {
    fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
        document.getElementById("quote-text").innerText = `"${data.content}" — ${data.author}`;
    })
    .catch(() => document.getElementById("quote-text").innerText = "Error fetching quote");
}
