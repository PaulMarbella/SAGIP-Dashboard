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

  // ✅ When pageName is missing — use base page and just start time
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

    console.log("Loaded:", storedUsername, role);

  });
  
  






//  fetch('https://www.pagasa.dost.gov.ph/rss.xml')
//   .then(response => response.text())
//   .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
//   .then(data => {
//     const items = data.querySelectorAll("item");
//     const list = document.getElementById("pagasa-weather");
//     for (let i = 0; i < 5; i++) {
//       const item = items[i];
//       const title = item.querySelector("title").textContent;
//       const link = item.querySelector("link").textContent;
//       const li = document.createElement("li");
//       li.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
//       list.appendChild(li);
//     }
//   })
//   .catch(err => {
//     document.getElementById("pagasa-weather").innerText = "Failed to load PAGASA weather feed.";
//     console.error(err);
//   });
  
  
  
  


  
  
  




  
