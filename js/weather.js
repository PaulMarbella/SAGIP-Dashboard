
document.getElementById('search-table').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#data-table tbody tr');

  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(query) ? '' : 'none';
  });
});

// API and caching

 (function () {
  const API_URL_Weather = "https://www.meteosource.com/api/v1/free/point?lat=14.501079546668159&lon=120.99492357355032&sections=daily&language=en&units=metric&key=uii5s91ll0p9ee245t8tg57hkwjbll6u874l2kgm";
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
      const response = await fetch(API_URL_Weather);
      const data = await response.json();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
      displayWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      alert("Failed to fetch weather data. Please try again later.");
    }
  }

  function displayWeather(data) {
    const days = data.daily.data.slice(0, 7);
    const tbody = document.getElementById("weatherTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    days.forEach(day => {
      const date = new Date(day.day).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });
      const tempMax = day.all_day.temperature_max;
      const tempMin = day.all_day.temperature_min;
      const summary = day.summary;

      const row = `
        <tr>
          <td>${date}</td>
          <td>${tempMax}°C</td>
          <td>${tempMin}°C</td>
          <td>${summary}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Initial fetch
  fetchWeather();
})();


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




  //graph
  (function () {
  let chartInstance;

  function generateChart() {
    const labels = [];
    const maxTemps = [];
    const minTemps = [];

    document.querySelectorAll('#weatherTableBody tr').forEach(row => {
      const cells = row.querySelectorAll('td');
      labels.push(cells[0].innerText);
      maxTemps.push(parseFloat(cells[1].innerText));
      minTemps.push(parseFloat(cells[2].innerText));
    });

    const ctx = document.getElementById('lineChart').getContext('2d');
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Max Temp (°C)',
            data: maxTemps,
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Min Temp (°C)',
            data: minTemps,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  // Optional: call generateChart() if needed on load
  // generateChart();

  // Optional: expose to global if other scripts need to call it
  window.generateChart = generateChart;

})();


  // Add download functionality
document.getElementById('downloadChartBtn').addEventListener('click', function () {
  if (chartInstance) {
    const link = document.createElement('a');
    link.href = chartInstance.toBase64Image();
    link.download = 'weather-chart.png';
    link.click();
  } else {
    alert("Chart is not available. Please generate it first.");
  }
});
