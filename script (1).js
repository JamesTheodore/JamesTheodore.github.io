document.addEventListener('DOMContentLoaded', function() {
    // Fetch news
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=fea3f7a67e09476fbb2557748cd66ca6')
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('news-list');
            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                newsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching news:', error));

    // Fetch weather
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=6062b2c3a70844f2922544c2b114fda7')
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.textContent = `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
        })
        .catch(error => console.error('Error fetching weather:', error));

    // Fetch quote
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quote = document.getElementById('quote');
            quote.textContent = `"${data.content}" — ${data.author}`;
        })
        .catch(error => console.error('Error fetching quote:', error));

    // Task management
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;
            taskList.appendChild(li);
            newTaskInput.value = '';
        }
    });

    // Focus timer
    const timer = document.getElementById('timer');
    const startTimerButton = document.getElementById('start-timer');
    const resetTimerButton = document.getElementById('reset-timer');
    let timerInterval;
    let timeLeft = 25 * 60;

    const updateTimerDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const startTimer = () => {
        if (timerInterval) return;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Time is up!');
            }
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 25 * 60;
        updateTimerDisplay();
    };

    startTimerButton.addEventListener('click', startTimer);
    resetTimerButton.addEventListener('click', resetTimer);

    updateTimerDisplay();
});