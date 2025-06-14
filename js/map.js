require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/widgets/Locate"
], function (Map, MapView, Graphic, FeatureLayer, Legend,Locate) {

  // --- Map and View Initialization ---
  const map = new Map({ basemap: "satellite" });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [120.99483138606303, 14.50057820761905],
    zoom: 16
  });

    // --- Locate Widget ---
    const locateBtn = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function(view, options) {
        options.target.scale = 1500; // Optional: Zoom level when locating
        return view.goTo(options.target);
      }
    });
  
    view.ui.add(locateBtn, "top-left");

    // Auto-locate user on map load and display coordinates
view.when(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Move the view to the user's location
      view.goTo({
        center: [longitude, latitude],
        scale: 1500
      });

      // Add a point graphic (blue dot)
      const userPoint = new Graphic({
        geometry: {
          type: "point",
          longitude: longitude,
          latitude: latitude
        },
        symbol: {
          type: "simple-marker",
          color: [0, 0, 255, 0.6],
          size: 12,
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        }
      });
      view.graphics.add(userPoint);

      // Display coordinates
      const coordDiv = document.getElementById("user-coordinates");
      coordDiv.textContent = `Your Location: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }, function (error) {
      document.getElementById("user-coordinates").textContent = "Location access denied.";
    });
  } else {
    document.getElementById("user-coordinates").textContent = "Geolocation not supported.";
  }
});

  

  // --- Symbols ---
  const sagipDot = { type: "simple-marker", color: "rgb(182,0,1)", size: 12, outline: { color: "white", width: 1 } };
  const waterDot = { type: "simple-marker", color: "rgb(0,184,244)", size: 12, outline: { color: "white", width: 1 } };
  const monitorDot = { type: "simple-marker", color: "black", size: 12, outline: { color: "white", width: 1 } };
  const evacuationDot = { type: "simple-marker", color: "green", size: 12, outline: { color: "white", width: 1 } };

  // --- Monitoring Station Graphics ---
  const graphics = [
    {
      geometry: { type: "point", longitude: 120.99480501817733, latitude: 14.50052525637967 },   
      symbol: sagipDot,
      attributes: {
        ObjectID: 1,
        Name: "SAGIP Station",
        Description: "Humidity, Temperature, Heat Index, and Water Level Monitoring"
      }
    },
    {
      geometry: { type: "point", longitude: 120.99435748129429, latitude: 14.500685498214198 },
      symbol: waterDot,
      attributes: {
        ObjectID: 2,
        Name: "Water Level Monitoring",
        Description: "Focused sensor for real-time water level detection"
      }
    },
    {
      geometry: { type: "point", longitude: 120.9949742865779, latitude: 14.50076314269143 },
      symbol: monitorDot,
      attributes: {
        ObjectID: 3,
        Name: "SAGIP Monitor",
        Description: "Focused monitoring - Dashboard"
      }
    },
  ];

  // --- Station FeatureLayer ---
  let stationLayer = createStationLayer(graphics);
  map.add(stationLayer);

  // --- Legend ---
  const legend = new Legend({
    view: view,
    layerInfos: [{ layer: stationLayer, title: "Monitoring Stations" }]
  });
  view.ui.add(legend, "bottom-left");

  // --- Heat Index Zones ---
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

  let heatZoneVisible = true;
  document.getElementById("toggleHeatZone").addEventListener("click", function () {
    if (heatZoneVisible) {
      view.graphics.remove(heatZoneGraphic);
      view.graphics.remove(heatZoneGraphic2);
      this.textContent = "Show Heat Index Zones";
    } else {
      view.graphics.add(heatZoneGraphic);
      view.graphics.add(heatZoneGraphic2);
      this.textContent = "Hide Heat Index Zones";
    }
    heatZoneVisible = !heatZoneVisible;
  });

  // --- Station Filter Dropdown ---
  document.getElementById("stationFilter").addEventListener("change", function () {
    const selected = this.value;
    map.remove(stationLayer);

    if (selected === "Hide All") {
      legend.layerInfos = [];
      return;
    }

    const filtered = selected === "All" ? graphics : graphics.filter(g => g.attributes.Name === selected);
    stationLayer = createStationLayer(filtered);
    map.add(stationLayer);

    legend.layerInfos = [{ layer: stationLayer, title: "Monitoring Stations" }];
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
      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      renderer: {
        type: "unique-value",
        field: "Name",
        uniqueValueInfos: [
          { value: "SAGIP Station", symbol: sagipDot, label: "SAGIP Station" },
          { value: "Water Level Monitoring", symbol: waterDot, label: "Water Level Monitoring" },
          { value: "SAGIP Monitor", symbol: monitorDot, label: "SAGIP Monitor" },
        ]
      }
    });
  }

  // --- Evacuation Zones ---
  const evacuationGraphics = [
    {
      geometry: { type: "point", longitude: 120.99064047179301, latitude: 14.50293698857822 },
      symbol: evacuationDot,
      attributes: {
        ObjectID: 101,
        Name: "Don Galo Sports Complex (Don Galo Gym)",
        Description: "Sport's Gym"
      }
    },
    {
      geometry: { type: "point", longitude: 120.99483138606303, latitude: 14.50057820761905 },
      symbol: evacuationDot,
      attributes: {
        ObjectID: 102,
        Name: "PUP Paranaque Campus",
        Description: "School Campus PUP"
      }
    },
    {
      geometry: { type: "point", longitude: 120.9911370196004, latitude: 14.505239949916819 },
      symbol: evacuationDot,
      attributes: {
        ObjectID: 103,
        Name: "Don Galo Barangay Hall",
        Description: "Enrique M Factor Rd, Paranaque City, Metro Manila"
      }
    }
  ];

  let evacuationLayer = null;
  let evacuationVisible = false;

  document.getElementById("toggleEvacuationZone").addEventListener("click", function () {
    if (!evacuationVisible) {
      evacuationLayer = new FeatureLayer({
        source: evacuationGraphics.map(g => new Graphic({
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
        objectIdField: "ObjectID",
        geometryType: "point",
        spatialReference: { wkid: 4326 },
        renderer: {
          type: "unique-value",
          field: "Name",
          uniqueValueInfos: evacuationGraphics.map(g => ({
            value: g.attributes.Name,
            symbol: evacuationDot,
            label: g.attributes.Name
          }))
        }
      });

      map.add(evacuationLayer);
      legend.layerInfos = [{ layer: evacuationLayer, title: "Evacuation Zones" }];
      map.remove(stationLayer);
      document.getElementById("stationFilter").value = "All";
      evacuationVisible = true;

    } else {
      map.remove(evacuationLayer);
      legend.layerInfos = [{ layer: stationLayer, title: "Monitoring Stations" }];
      map.add(stationLayer);
      evacuationVisible = false;
    }
  });

});
