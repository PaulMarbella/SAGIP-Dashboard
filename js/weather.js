// ✅ Apply conditions to rows
function applyWeatherConditions() {
  const rows = document.querySelectorAll("#data-table tbody tr");

  rows.forEach(row => {
    const temp = parseFloat(row.children[1]?.textContent) || 0;
    const hum = parseFloat(row.children[2]?.textContent) || 0;
    const hi = parseFloat(row.children[5]?.textContent) || 0;
    const conditionCell = row.children[6];
    if (!conditionCell) return;

    conditionCell.classList.remove(
      "text-danger", "text-warning", "text-info",
      "text-primary", "text-success", "fw-bold"
    );

    let condition = "Normal";
    if (hi >= 50 || temp >= 40) {
      condition = "🔥 Danger";
      conditionCell.classList.add("text-danger", "fw-bold");
    } else if (hi >= 41 || temp >= 35) {
      condition = "⚠️ Warning";
      conditionCell.classList.add("text-warning", "fw-bold");
    } else if (hum <= 20) {
      condition = "💧 Dry";
      conditionCell.classList.add("text-info");
    } else if (hum >= 90) {
      condition = "💦 Humid";
      conditionCell.classList.add("text-primary");
    } else {
      condition = "✅ Normal";
      conditionCell.classList.add("text-success");
    }

    conditionCell.textContent = condition;
  });
};
applyWeatherConditions();

// ✅ Combined filter: date range + search
function filterTableCombined() {
  const from = document.getElementById('filter-from')?.value;
  const to = document.getElementById('filter-to')?.value;
  const search = document.getElementById('search-table')?.value.toLowerCase();
  const rows = document.querySelectorAll('#data-table tbody tr');

  rows.forEach(row => {
    const rowDate = row.cells[0]?.textContent.trim().split(' ')[0]; // YYYY-MM-DD
    const rowText = row.textContent.toLowerCase();
    const matchesSearch = rowText.includes(search);
    const matchesDate = (!from || rowDate >= from) && (!to || rowDate <= to);
    row.style.display = (matchesSearch && matchesDate) ? '' : 'none';
  });
}

// ✅ Filter listeners
document.getElementById('filter-from')?.addEventListener('input', filterTableCombined);
document.getElementById('filter-to')?.addEventListener('input', filterTableCombined);
document.getElementById('search-table')?.addEventListener('input', filterTableCombined);

// ✅ On DOM load: apply conditions and filters
document.addEventListener("DOMContentLoaded", () => {
  applyWeatherConditions();
  filterTableCombined(); // in case filters are pre-filled
});

// ✅ Refresh table from PHP endpoint
document.getElementById('refresh')?.addEventListener('click', () => {
  const tbody = document.querySelector('#data-table tbody');
  if (!tbody) return;

  fetch('/SAGIP-Dashboard/handlers/historical/historicalData.php')
    .then(res => res.text())
    .then(data => {
      tbody.innerHTML = data;
      applyWeatherConditions();
      filterTableCombined();
      console.log("✅ Table refreshed");
    })
    .catch(err => console.error("❌ Refresh failed:", err));
});

// ✅ CSV export of visible rows
document.getElementById("download-csv")?.addEventListener("click", function () {
  const table = document.getElementById("data-table");
  if (!table) return;

  const rows = table.querySelectorAll("thead tr, tbody tr");
  let csvContent = "";
  rows.forEach(row => {
    if (row.style.display === "none") return;
    const cols = row.querySelectorAll("th, td");
    const rowData = Array.from(cols).map(col =>
      `"${col.textContent.trim().replace(/"/g, '""')}"`
    );
    csvContent += rowData.join(",") + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "weather_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});


(function () {
  let chart2024 = null;
  let chart2025 = null;

  window.generateChart = function () {
    const rows = document.querySelectorAll("#data-table tbody tr");
    const data2024 = { labels: [], temp: [], hum: [], hi: [] };
    const data2025 = { labels: [], temp: [], hum: [], hi: [] };

    rows.forEach(row => {
      if (row.style.display === "none") return;
      const [date] = row.cells[0].textContent.trim().split(" ");
      const year = date.split("-")[0];
      const temp = parseFloat(row.cells[1].textContent) || 0;
      const hum = parseFloat(row.cells[2].textContent) || 0;
      const hi = parseFloat(row.cells[5].textContent) || 0;
      const target = year === "2024" ? data2024 : year === "2025" ? data2025 : null;
      if (target) {
        target.labels.push(date);
        target.temp.push(temp);
        target.hum.push(hum);
        target.hi.push(hi);
      }
    });

    function extendData(data) {
      const avg = arr => arr.slice(-5).reduce((a, b) => a + b, 0) / 5 || 0;
      data.labels.push("Pred +1", "Pred +2");
      data.temp.push(avg(data.temp) + 0.5, avg(data.temp) + 1);
      data.hum.push(avg(data.hum), avg(data.hum));
      data.hi.push(avg(data.hi) + 0.3, avg(data.hi) + 0.8);
    }

    extendData(data2024);
    extendData(data2025);

    if (chart2024) chart2024.destroy();
    if (chart2025) chart2025.destroy();

    chart2024 = new Chart(document.getElementById("lineChart2024"), {
      type: 'line',
      data: {
        labels: data2024.labels,
        datasets: [
          { label: "Temp (°C)", data: data2024.temp, borderColor: "red", fill: false },
          { label: "Humidity (%)", data: data2024.hum, borderColor: "blue", fill: false },
          { label: "Heat Index (°C)", data: data2024.hi, borderColor: "orange", fill: false }
        ]
      },
      options: { responsive: true, plugins: { title: { display: true, text: "2024 Environmental Data" } } }
    });

    chart2025 = new Chart(document.getElementById("lineChart2025"), {
      type: 'line',
      data: {
        labels: data2025.labels,
        datasets: [
          { label: "Temp (°C)", data: data2025.temp, borderColor: "red", fill: false },
          { label: "Humidity (%)", data: data2025.hum, borderColor: "blue", fill: false },
          { label: "Heat Index (°C)", data: data2025.hi, borderColor: "orange", fill: false }
        ]
      },
      options: { responsive: true, plugins: { title: { display: true, text: "2025 Environmental Data" } } }
    });
  };
})();

// ✅ Chart download
document.getElementById("downloadChartBtn")?.addEventListener("click", () => {
  const chart1 = document.getElementById("lineChart2024");
  const chart2 = document.getElementById("lineChart2025");

  if (!chart1 || !chart2) {
    alert("Charts not found.");
    return;
  }

  const image1 = chart1.toDataURL("image/png");
  const image2 = chart2.toDataURL("image/png");

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html><head><title>Annual Environmental Trend</title>
    <style>body{text-align:center;font-family:Arial;padding:20px;}h1{font-size:18pt;}img{max-width:90%;margin:20px 0;}</style>
    </head><body>
    <h1>Environmental Trend – 2024</h1><img src="${image1}" />
    <h1>Environmental Trend – 2025</h1><img src="${image2}" />
    <script>window.onload = function(){window.print();}</script>
    </body></html>
  `);

  printWindow.document.close();
});
