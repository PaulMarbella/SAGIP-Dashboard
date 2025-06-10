// Philipine Time
function updateDate() {
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Manila', 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const phDate = now.toLocaleDateString('en-US', options);
    document.getElementById("phTime").innerText = phDate;
}

setInterval(updateDate, 1000 * 60); // Update every minute
updateDate();


//Render pages
function loadPage(pageName) {
  const pagePaths = {
    commandCenter: "/pages/Command-Center/command-center.html",
    deviceManager: "/pages/Device-Manager/device-manager.html",
    analyticalMapping: "/pages/Analytical-Mapping/analytical-mapping.html",
    arcGIS: "/pages/arcGIS/ArcGIS.html",
    camera: "/pages/Camera/camera.html"
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
        script.remove();
      });

      // Then inject the remaining HTML (without scripts)
      mainContent.innerHTML = tempDiv.innerHTML;
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

  
  //name
  document.addEventListener('DOMContentLoaded', () => {
    const storedName = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
  
    const nameSpans = ['displayName1', 'displayName2'];
    const greetingIds = ['userGreeting1', 'userGreeting2'];

  
    if (storedName && role === 'user') {
      nameSpans.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = storedName;
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
  
  
  
  


  
  
  




  
