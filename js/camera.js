let waterChart;

document.getElementById("waterLevelModal").addEventListener("shown.bs.modal", () => {
  fetch("/SAGIP-Dashboard/handlers/weather/waterleveldataset.php")
    .then(res => res.json())
    .then(data => {
      // Handle error from PHP
      if (data.error) {
        console.error("❌ Error:", data.error);
        return;
      }

      // Normalize to array if single object
      const chartData = Array.isArray(data) ? data : [data];

      const labels = chartData.map(row => {
        const date = new Date(row.timestamp);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
      });
      
      const values = chartData.map(row => parseInt(row.water_mm));

      const ctx = document.getElementById("waterLevelLineChart").getContext("2d");

      if (waterChart) waterChart.destroy();

      waterChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Water Level (mm)",
            data: values,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: "Water Level (mm)"
              }
            },
            x: {
              title: {
                display: true,
                text: "Timestamp"
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: "Water Level Prediction Analysis"
            }
          }
        }
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
});


// PDF Download
document.getElementById("downloadChartPDF").addEventListener("click", () => {
  const element = document.getElementById("chartContainer");
  const opt = {
    margin:       0.5,
    filename:     `WaterLevelChart_${new Date().toISOString().split('T')[0]}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
  };
  html2pdf().from(element).set(opt).save();
});