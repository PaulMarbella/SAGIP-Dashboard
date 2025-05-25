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

