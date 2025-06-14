
// Philipine Time
function updateDateTime() {
  const el = document.getElementById("phTime");
  if (!el) {
    return;
  }

  const now = new Date();
  const dateOptions = {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const timeOptions = {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  const phDate = now.toLocaleDateString('en-US', dateOptions);
  const phTime = now.toLocaleTimeString('en-US', timeOptions);

  el.innerText = `${phTime} | ${phDate}`;
}

updateDateTime(); 
setInterval(updateDateTime, 1000); 



  document.addEventListener('DOMContentLoaded', function () {
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarInstance = bootstrap.Offcanvas.getOrCreateInstance(mobileSidebar);

    document.querySelectorAll('.close-on-click').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // prevent default behavior

        // Save reference to the clicked element
        const target = e.currentTarget;

        // Listen for sidebar hidden event before loading content
        mobileSidebar.addEventListener('hidden.bs.offcanvas', function handler() {
          // Remove event listener after it's triggered once
          mobileSidebar.removeEventListener('hidden.bs.offcanvas', handler);

          // Load content (if it's an onclick based nav)
          if (typeof loadPage === 'function' && target.hasAttribute('onclick')) {
            const onclickAttr = target.getAttribute('onclick');
            const match = onclickAttr.match(/loadPage\(['"]([^'"]+)['"]\)/);
            if (match) loadPage(match[1]);
          }

          // Remove lingering backdrop manually as a failsafe
          document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
        });

        sidebarInstance.hide();
      });
    });
  });




//Render pages
function loadPage(pageName) {
  const pagePaths = {
    commandCenter: "/SAGIP-Dashboard/pages/Command-Center/command-center.php",
    deviceManager: "/SAGIP-Dashboard/pages/Device-Manager/device-manager.php",
    analyticalMapping: "/SAGIP-Dashboard/pages/Analytical-Mapping/analytical-mapping.php",
    arcGIS: "/SAGIP-Dashboard/pages/arcGIS/ArcGIS.php",
    camera: "/SAGIP-Dashboard/pages/Camera/camera.php",
    aboutUs: "/SAGIP-Dashboard/pages/Footer/about-us.html",
    contactUs: "/SAGIP-Dashboard/pages/Footer/contact-us.html",
    privacyPolicy: "/SAGIP-Dashboard/pages/Footer/privacy-policy.html",
    termsOfUse: "/SAGIP-Dashboard/pages/Footer/terms-of-use.html"
  };

  if (!pageName || !pagePaths[pageName]) {
    const el = document.getElementById("phTime");
    if (el) {
      updateDateTime();
      setInterval(updateDateTime, 1000);
    } else {
      console.warn("#phTime not found on base page");
    }
    return;
  }

  if (window.chartInstance) {
    window.chartInstance.destroy();
    window.chartInstance = null;
  }

  if (window.mapView) {
    window.mapView.destroy();
    window.mapView = null;
  }

  // ✅ Otherwise, load the selected page
  const filePath = pagePaths[pageName];

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(html => {
  const mainContent = document.getElementById("main-content");

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Insert the HTML first
  mainContent.innerHTML = tempDiv.innerHTML;

  // Then re-attach the scripts so they execute after DOM is ready
  const scripts = tempDiv.querySelectorAll("script");
  scripts.forEach(script => {
  const newScript = document.createElement("script");

  if (script.src) {
    newScript.src = script.src;
    newScript.async = false;
  } else {
    newScript.textContent = script.textContent;
  }

  // Detect whether to inject into head or body
  if (script.type === "module" || script.getAttribute('data-head') === "true") {
    document.head.appendChild(newScript);
  } else {
    document.body.appendChild(newScript);
  }
});


})
    .catch(error => {
      document.getElementById("main-content").innerHTML = "<p>Error loading content.</p>";
      console.error(error);
    });
}





const links = document.querySelectorAll('.nav-page');

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });


  document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault(); // prevent immediate redirect
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        window.location.href = "../../index.php"; // now safely redirect
      });
    }
  });
  
  
  //name
  document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username'); 
    const role = localStorage.getItem('role');
  
    const nameSpans = ['displayName1', 'displayName2'];
    const greetingIds = ['userGreeting1', 'userGreeting2'];
  
    if (storedUsername && role === 'user') {
      nameSpans.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = storedUsername; 
      });
      greetingIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = '';
      });
    } else if (role === 'admin') {
      greetingIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
    }

    // console.log("Loaded:", storedUsername, role);

  });
  
  


//readings
(function () {
  console.log("[Auto-refresh temperature/humidity/etc script running]");

  function updateReadings() {
    fetch("/SAGIP-Dashboard/handlers/weather/readings.php")
      .then(res => res.json())
      .then(data => {
        if (!data || data.error) {
          console.warn("Error from PHP:", data.error);
          return;
        }

        const temp = parseFloat(data.temperature);
        const hum = parseFloat(data.humidity);
        const pres = parseFloat(data.pressure);
        const alt = parseFloat(data.altitude);
        const hi = parseFloat(data.heatIndex);
        const time = new Date(data.updated_at).toLocaleString('en-US', {
          timeZone: 'Asia/Manila',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        // 🔴 Temperature
        const tempDisplay = document.getElementById("temperatureDisplay");
        const tempTime = document.getElementById("tempUpdatedAt");
        if (tempDisplay && tempTime) {
          tempDisplay.textContent = `${temp.toFixed(1)}°C`;
          tempTime.textContent = `Last updated: ${time}`;

          if (temp < 26) tempDisplay.style.color = "blue";
          else if (temp < 32) tempDisplay.style.color = "orange";
          else if (temp < 38) tempDisplay.style.color = "orangered";
          else tempDisplay.style.color = "red";
        }

        // 🔵 Humidity
        const humDisplay = document.getElementById("humidityDisplay");
        const humTime = document.getElementById("humUpdatedAt");
        if (humDisplay && humTime) {
          humDisplay.textContent = `${hum.toFixed(1)}%`;
          humTime.textContent = `Last updated: ${time}`;
        }

        // 🟠 Heat Index
        const heatDisplay = document.getElementById("heatDisplay");
        const heatTime = document.getElementById("heatUpdatedAt");
        if (heatDisplay && heatTime) {
          heatDisplay.textContent = `${hi.toFixed(1)}°C`;
          heatTime.textContent = `Last updated: ${time}`;
        }

        // 🟡 Pressure
        const pressureDisplay = document.getElementById("pressureDisplay");
        const pressureTime = document.getElementById("pressureUpdatedAt");
        if (pressureDisplay && pressureTime) {
          pressureDisplay.textContent = `${pres.toFixed(1)} mb`;
          pressureTime.textContent = `Last updated: ${time}`;
        }

        // 🟢 Altitude
        const altitudeDisplay = document.getElementById("altitudeDisplay");
        const altitudeTime = document.getElementById("altitudeUpdatedAt");
        if (altitudeDisplay && altitudeTime) {
          altitudeDisplay.textContent = `${alt.toFixed(1)} m`;
          altitudeTime.textContent = `Last updated: ${time}`;
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }

  updateReadings();
  setInterval(updateReadings, 5000);
})();


(function () {
  function updateWaterStatus() {
    fetch("/SAGIP-Dashboard/handlers/weather/waterlevel.php")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.warn("No data:", data.error);
          return;
        }

        const waterDisplay = document.getElementById("waterDisplay");
        const waterAlert = document.getElementById("waterAlertLevel");
        const waterTime = document.getElementById("waterUpdatedAt");

        if (waterDisplay && waterAlert && waterTime) {
          const waterMeters = parseFloat(data.water_mm) / 1000;
          waterDisplay.childNodes[0].nodeValue = `${waterMeters.toFixed(1)}m `;
          waterAlert.textContent = data.alert_level;

          // ✅ Format time to: June 14, 2025 9:33 AM
          const time = new Date(data.timestamp);
          const formattedTime = time.toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          waterTime.textContent = formattedTime;

          if (data.alert_level.toLowerCase() === 'normal') {
            waterDisplay.classList.remove("text-danger");
            waterDisplay.classList.add("text-dark");
          } else {
            waterDisplay.classList.add("text-danger");
          }
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }

  updateWaterStatus();
  setInterval(updateWaterStatus, 60000);
})();



  





  
