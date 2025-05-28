//Philipine Time
function updateTime() {
    const now = new Date();
    const options = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const phTime = now.toLocaleTimeString('en-US', options);
    document.getElementById("phTime").innerText = phTime;
    document.getElementById("phTimeMobile").innerText = phTime;
}
setInterval(updateTime, 1000);
updateTime();


//Render pages
function loadPage(pageName) {
  const pagePaths = {
    home: "Home.html",
    hourly: "./pages/hourly/hourly.html",
    daily: "./pages/Daily/daily.html",
    map: "./pages/Map/map.html",
    message: "./pages/Message/message.html"
  };

  const filePath = pagePaths[pageName];

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("main-content").innerHTML = html;
    })
    .catch(error => {
      document.getElementById("main-content").innerHTML = "<p>Error loading content.</p>";
      console.error(error);
    });
}

// searchBar
  // document.getElementById("searchBar").addEventListener("keyup", function () {
  //   const filter = this.value.toLowerCase();
  //   const rows = document.querySelectorAll("#dataTable tbody tr");

  //   rows.forEach(row => {
  //     const text = row.textContent.toLowerCase();
  //     row.style.display = text.includes(filter) ? "" : "none";
  //   });
  // });


  // splash
   window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      document.getElementById("splash-screen").style.opacity = 0;
      setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("app").style.display = "block";
      }, 500); 
    }, 10000); 
  });





  
