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
      const mainContent = document.getElementById("main-content");

      // Extract scripts
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      // Move all script tags out of HTML
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach(script => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
          newScript.async = script.async;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
        script.remove(); // remove from tempDiv to avoid duplication
      });

      // Then inject the remaining HTML (without scripts)
      mainContent.innerHTML = tempDiv.innerHTML;
    })
    .catch(error => {
      document.getElementById("main-content").innerHTML = "<p>Error loading content.</p>";
      console.error(error);
    });
}


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





  
