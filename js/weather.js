// searchBar
document.getElementById('search-table').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#data-table tbody tr');

  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(query) ? '' : 'none';
  });
});



// API TABLE
  const apiKey = "a1dc0d26e76c4ce0896155500252405";
  const city = "Paranaque";

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then(res => res.json())
    .then(data => {
      const row = `
        <tr>
          <td>${data.location.name}</td>
          <td>${data.current.temp_c} °C</td>
          <td>${data.current.condition.text}</td>
        </tr>
      `;
      document.querySelector("#data-table tbody").innerHTML = row;
    });



  async function fetchWeatherData() {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
  return await response.json();
  }

  async function refreshTable() {
    const tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = '<tr><td colspan="3" class="text-center">Loading...</td></tr>';

    const data = await fetchWeatherData();

    tbody.innerHTML = "";

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.city}</td>
        <td>${item.temperature}</td>
        <td>${item.condition}</td>
      `;
      tbody.appendChild(row);
    });
  }


  document.getElementById("refresh").addEventListener("click", refreshTable);

  window.addEventListener("DOMContentLoaded", refreshTable);


