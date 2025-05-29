// searchBar
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-table");
    const rows = document.querySelectorAll("#data-table tbody tr");
  
    searchInput.addEventListener("keyup", function () {
      const filter = this.value.toLowerCase();
  
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
  });
  