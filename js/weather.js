// searchBar filtering
document.getElementById('search-table').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#data-table tbody tr');

  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(query) ? '' : 'none';
  });
});

// API and caching
let API_URL = "https://www.meteosource.com/api/v1/free/point?lat=14.501079546668159&lon=120.99492357355032&sections=daily&language=en&units=metric&key=uii5s91ll0p9ee245t8tg57hkwjbll6u874l2kgm";
const CACHE_KEY = "weatherCache";
const CACHE_EXPIRY_HOURS = 6;

async function fetchWeather(forceRefresh = false) {
  const now = Date.now();
  const cached = JSON.parse(localStorage.getItem(CACHE_KEY));

  if (!forceRefresh && cached && now - cached.timestamp < CACHE_EXPIRY_HOURS * 3600 * 1000) {
    console.log("Using cached weather data");
    displayWeather(cached.data);
    return;
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
    displayWeather(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function displayWeather(data) {
  const days = data.daily.data.slice(0, 7);
  const tbody = document.getElementById("weatherTableBody");
  tbody.innerHTML = "";

  days.forEach(day => {
    const date = new Date(day.day).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });
    const tempMax = day.all_day.temperature_max;
    const tempMin = day.all_day.temperature_min;
    const summary = day.summary

    const row = `
      <tr>
        <td>${date}</td>
        <td>${tempMax}°C</td>
        <td>${tempMin}°C</td>
        <td>${summary}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
    console.log(tempMax)
  });
}

// Initial fetch
fetchWeather();

// Refresh button listener
document.getElementById("refresh").addEventListener("click", () => {
  localStorage.removeItem(CACHE_KEY);
  fetchWeather(true);
  console.log("Refresh clicked");
});


//download
document.getElementById("download-csv").addEventListener("click", function () {
    const rows = document.querySelectorAll("table tr");
    let csvContent = "";

    rows.forEach(row => {
      const cols = row.querySelectorAll("th, td");
      const rowData = [];
      cols.forEach(col => rowData.push(`"${col.textContent.trim()}"`));
      csvContent += rowData.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "weather_data.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });