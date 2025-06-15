
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/widgets/Locate"
], function (Map, MapView, Graphic, FeatureLayer, Legend, Locate) {

  const map = new Map({ basemap: "satellite" });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [120.99483138606303, 14.50057820761905],
    zoom: 16
  });

  const locateBtn = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: (view, options) => {
      options.target.scale = 1500;
      return view.goTo(options.target);
    }
  });
  view.ui.add(locateBtn, "top-left");

  const coordDiv = document.getElementById("user-coordinates");
  view.when(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        view.goTo({ center: [longitude, latitude], scale: 1500 });

        const userPoint = new Graphic({
          geometry: { type: "point", longitude, latitude },
          symbol: {
            type: "simple-marker",
            color: [0, 0, 255, 0.6],
            size: 12,
            outline: { color: [255, 255, 255], width: 1 }
          }
        });
        view.graphics.add(userPoint);
        if (coordDiv) coordDiv.textContent = `Your Location: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      }, () => {
        if (coordDiv) coordDiv.textContent = "Location access denied.";
      });
    } else {
      if (coordDiv) coordDiv.textContent = "Geolocation not supported.";
    }
  });

  const sagipDot = { type: "simple-marker", color: "rgb(182,0,1)", size: 12, outline: { color: "white", width: 1 } };
  const waterDot = { type: "simple-marker", color: "rgb(0,184,244)", size: 12, outline: { color: "white", width: 1 } };
  const monitorDot = { type: "simple-marker", color: "black", size: 12, outline: { color: "white", width: 1 } };
  const evacuationDot = { type: "simple-marker", color: "green", size: 12, outline: { color: "white", width: 1 } };
  const non_evacuation = { type: "simple-marker", color: "red", size: 12, outline: { color: "white", width: 1 } };

  const graphics = [
    {
      geometry: { type: "point", longitude: 120.99480501817733, latitude: 14.50052525637967 },
      symbol: sagipDot,
      attributes: {
        ObjectID: 1,
        Name: "SAGIP Station",
        Description: "Esp32 microcontroller powered by Solar Panel (Status:  🟢 Active)"
      }
    },
    {
      geometry: { type: "point", longitude: 120.99435748129429, latitude: 14.500685498214198 },
      symbol: waterDot,
      attributes: {
        ObjectID: 2,
        Name: "Water Level Monitoring",
        Description: "Focused sensor for real-time water level detection (Status:  🟢 Active)"
      }
    },
    {
      geometry: { type: "point", longitude: 120.9949742865779, latitude: 14.50076314269143 },
      symbol: monitorDot,
      attributes: {
        ObjectID: 3,
        Name: "SAGIP Monitor",
        Description: "Focused monitoring - Dashboard (Status:  🟢 Active)"
      }
    }
  ];

  let stationLayer = createStationLayer(graphics);
  map.add(stationLayer);

  const legend = new Legend({
    view: view,
    layerInfos: [{ layer: stationLayer, title: "Monitoring Stations" }]
  });
  view.ui.add(legend, "bottom-left");

  const isAdmin = localStorage.getItem("role") === "admin";

  const tooltip = document.createElement("div");
  Object.assign(tooltip.style, {
    position: "absolute",
    padding: "10px 20px",
    background: "white",
    color: "black",
    borderRadius: "4px",
    pointerEvents: "none",
    fontSize: "13px",
    display: "none",
    zIndex: "1000"
  });
  document.body.appendChild(tooltip);
  let tooltipPinned = false;

  view.on("pointer-move", function (event) {
    if (tooltipPinned) return;
    view.hitTest(event).then(function (response) {
      const graphic = response.results.find(result => {
        const attr = result.graphic?.attributes;
        return attr && (attr.Description || attr.Name);
      });
      tooltip.style.display = graphic ? "block" : "none";
      if (graphic) showTooltip(graphic.graphic, event.x, event.y);
    });
  });

  view.on("click", function (event) {
    view.hitTest(event).then(function (response) {
      const graphic = response.results.find(result => {
        const attr = result.graphic?.attributes;
        return attr && (attr.Description || attr.Name);
      });
      tooltipPinned = !!graphic;
      tooltip.style.display = graphic ? "block" : "none";
      if (graphic) showTooltip(graphic.graphic, event.x, event.y, true);
    });
  });

  function showTooltip(graphic, x, y, allowEdit = false) {
    const name = graphic.attributes?.Name || "Unknown";
    const desc = graphic.attributes?.Description || "";

    tooltip.style.left = `${Math.min(x, window.innerWidth - 250)}px`;
    tooltip.style.top = `${Math.min(y, window.innerHeight - 420)}px`;

    if (isAdmin && allowEdit) {
      tooltip.innerHTML = `
        <div>
          <span class="fw-bold">${name}</span><br>
          <span id="desc-text">${desc}</span><br>
          <button class="btn btn-sm btn-outline-primary mt-1" id="editMarkerBtn">Edit</button>
          <button class="btn btn-sm btn-outline-secondary mt-1 ms-1" id="closeTooltipBtn">Close</button>
        </div>
      `;

      setTimeout(() => {
        document.getElementById("editMarkerBtn")?.addEventListener("click", () => {
          const newDesc = prompt("Enter new description:", desc);
          if (newDesc !== null) {
            graphic.attributes.Description = newDesc;
            document.getElementById("desc-text").textContent = newDesc;
          }

          const newColor = prompt("Enter new color (CSS format):", graphic.symbol?.color || "rgb(0,0,255)");
          if (newColor && graphic.symbol) graphic.symbol.color = newColor;

          stationLayer.applyEdits({ updateFeatures: [graphic] })
            .then(() => alert("Marker updated."))
            .catch(err => console.error("Edit failed:", err));
        });

        document.getElementById("closeTooltipBtn")?.addEventListener("click", () => {
          tooltipPinned = false;
          tooltip.style.display = "none";
        });
      }, 0);
    } else {
      tooltip.innerHTML = `<div><span class="fw-bold">${name}</span><br>${desc}</div>`;
    }
  }

  const heatZoneGraphic = new Graphic({
    geometry: {
      type: "polygon",
      rings: [[120.993, 14.499], [120.996, 14.499], [120.996, 14.502], [120.993, 14.502], [120.993, 14.499]]
    },
    symbol: {
      type: "simple-fill",
      color: [255, 69, 0, 0.2],
      outline: { color: [255, 0, 0], width: 2 }
    },
    attributes: { zone: "Extreme Caution Heat Index" },
    popupTemplate: {
      title: "{zone}",
      content: "Heat index in this area is between 90–105°F (32–41°C). Stay hydrated and avoid long exposure."
    }
  });

  const heatZoneGraphic2 = new Graphic({
    geometry: {
      type: "polygon",
      rings: [[120.991, 14.503], [120.993, 14.503], [120.993, 14.505], [120.991, 14.505], [120.991, 14.503]]
    },
    symbol: {
      type: "simple-fill",
      color: [255, 69, 0, 0.2],
      outline: { color: [255, 0, 0], width: 2 }
    },
    attributes: { zone: "Caution Heat Index" },
    popupTemplate: {
      title: "{zone}",
      content: "Heat index in this area is between 80–90°F (27–32°C). Stay cool and drink water frequently."
    }
  });

  let heatZoneVisible = false;
  document.getElementById("toggleHeatZone").addEventListener("click", function () {
    heatZoneVisible = !heatZoneVisible;
    if (heatZoneVisible) {
      view.graphics.addMany([heatZoneGraphic, heatZoneGraphic2]);
      this.textContent = "Hide Heat Index Zones";
    } else {
      view.graphics.removeMany([heatZoneGraphic, heatZoneGraphic2]);
      this.textContent = "Show Heat Index Zones";
    }
  });

  require(["esri/geometry/Point"], function (Point) {
    document.getElementById("stationFilter").addEventListener("change", function () {
      const selected = this.value;
      map.remove(stationLayer);
  
      if (selected === "Hide All") {
        legend.layerInfos = [];
        return;
      }
  
      const filtered = selected === "All"
        ? graphics
        : graphics.filter(g => g.attributes.Name === selected);
  
      stationLayer = createStationLayer(filtered);
      map.add(stationLayer);
      legend.layerInfos = [{ layer: stationLayer, title: "Monitoring Stations" }];
  
      if (filtered.length === 1) {
        const geom = filtered[0].geometry;
        const point = new Point({
          longitude: geom.longitude,
          latitude: geom.latitude,
          spatialReference: { wkid: 4326 } // Make sure it's WGS84
        });
  
        view.whenLayerView(stationLayer).then(() => {
          view.goTo({
            target: point,
            scale: 1500
          });
        });
      }
    });
  });
  
  
  

  function createStationLayer(sourceGraphics) {
    return new FeatureLayer({
      source: sourceGraphics.map(g => new Graphic({
        geometry: g.geometry,
        symbol: g.symbol,
        attributes: g.attributes,
        popupTemplate: {
          title: "{Name}",
          content: "{Description}"
        }
      })),
      fields: [
        { name: "ObjectID", type: "oid" },
        { name: "Name", type: "string" },
        { name: "Description", type: "string" }
      ],
      outFields: ["*"],
      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      renderer: {
        type: "unique-value",
        field: "Name",
        uniqueValueInfos: sourceGraphics.map(g => ({
          value: g.attributes.Name,
          symbol: g.symbol,
          label: g.attributes.Name
        }))
      }
    });
  }

  const evacuationGraphics = [
    {
      geometry: { type: "point", longitude: 120.99064047179301, latitude: 14.50293698857822 },
      symbol: evacuationDot,
      attributes: { ObjectID: 101, Name: "Don Galo Sports Complex (Don Galo Gym)", Description: "Sport's Gym" }
    },
    {
      geometry: { type: "point", longitude: 120.99483138606303, latitude: 14.50057820761905 },
      symbol: evacuationDot,
      attributes: { ObjectID: 102, Name: "PUP Paranaque Campus", Description: "School Campus PUP" }
    },
    {
      geometry: { type: "point", longitude: 120.9911370196004, latitude: 14.505239949916819 },
      symbol: non_evacuation,
      attributes: { ObjectID: 103, Name: "Don Galo Barangay Hall", Description: "⚠️ Not Safe (Flood Caution)" }
    }
  ];

  let evacuationLayer = null;
  let evacuationVisible = false;

  document.getElementById("toggleEvacuationZone").addEventListener("click", function () {
    evacuationVisible = !evacuationVisible;
    if (evacuationVisible) {
      evacuationLayer = createStationLayer(evacuationGraphics);
      map.remove(stationLayer);
      map.add(evacuationLayer);
      legend.layerInfos = [{ layer: evacuationLayer, title: "Evacuation Zones" }];
      document.getElementById("stationFilter").value = "All";
    } else {
      map.remove(evacuationLayer);
      map.add(stationLayer);
      legend.layerInfos = [{ layer: stationLayer, title: "Monitoring Stations" }];
    }
  });

});

