require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend"
], function (Map, MapView, Graphic, FeatureLayer, Legend) {

  const map = new Map({
    basemap: "satellite"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [120.99483138606303, 14.50057820761905],
    zoom: 16
  });

  // Define symbols for different types of points
  const sagipDot = {
    type: "simple-marker",
    color: "yellow",
    size: 12,
    outline: { color: "white", width: 1 }
  };

  const waterDot = {
    type: "simple-marker",
    color: "blue",
    size: 12,
    outline: { color: "white", width: 1 }
  };

  const monitorDot = {
    type: "simple-marker",
    color: "black",
    size: 12,
    outline: { color: "white", width: 1 }
  };


  // Define the graphics with their geometries, symbols, and attributes
  const graphics = [
    {
      geometry: {
        type: "point",
        longitude: 120.99483138606303,
        latitude: 14.50057820761905
      },
      symbol: sagipDot,
      attributes: {
        ObjectID: 1,
        Name: "SAGIP Station",
        Description: "Humidity, Temperature, Heat Index, and Water Level Monitoring"
      }
    },
    {
      geometry: {
        type: "point",
        longitude: 120.99435748129429,
        latitude: 14.500685498214198
      },
      symbol: waterDot,
      attributes: {
        ObjectID: 2,
        Name: "Water Level Monitoring",
        Description: "Focused sensor for real-time water level detection"
      }
    },
    {
      geometry: {
        type: "point",
        longitude: 120.9949742865779,
        latitude: 14.50076314269143
      },
      symbol: monitorDot,
      attributes: {
        ObjectID: 3,
        Name: "SAGIP Monitor",
        Description: "Focused monitoring - Dashboard"
      }
    },
  ];

  // Create the FeatureLayer from the graphics
  let stationLayer = new FeatureLayer({
    source: graphics.map(g => new Graphic({
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

  map.add(stationLayer);

  // Initialize the Legend widget
  const legend = new Legend({
    view: view,
    layerInfos: [{ layer: stationLayer, title: "Legend:" }]
  });

  view.ui.add(legend, "bottom-left");

  // Heat Index Zones
  const heatZonePolygon = {
    type: "polygon",
    rings: [
      [120.993, 14.499],
      [120.996, 14.499],
      [120.996, 14.502],
      [120.993, 14.502],
      [120.993, 14.499]
    ]
  };

  const heatZoneSymbol = {
    type: "simple-fill",
    color: [255, 69, 0, 0.2], // semi-transparent orange-red
    outline: {
      color: [255, 0, 0],
      width: 2
    }
  };

  const heatZoneGraphic = new Graphic({
    geometry: heatZonePolygon,
    symbol: heatZoneSymbol,
    attributes: {
      zone: "Extreme Caution Heat Index"
    },
    popupTemplate: {
      title: "{zone}",
      content: "Heat index in this area is between 90–105°F (32–41°C). Stay hydrated and avoid long exposure."
    }
  });

  const heatZonePolygon2 = {
    type: "polygon",
    rings: [
      [120.991, 14.503],
      [120.993, 14.503],
      [120.993, 14.505],
      [120.991, 14.505],
      [120.991, 14.503]
    ]
  };

  const heatZoneSymbol2 = {
    type: "simple-fill",
    color: [255, 69, 0, 0.2], // semi-transparent orange-red
    outline: {
      color: [255, 0, 0],
      width: 2
    }
  };

  const heatZoneGraphic2 = new Graphic({
    geometry: heatZonePolygon2,
    symbol: heatZoneSymbol2,
    attributes: {
      zone: "Caution Heat Index"
    },
    popupTemplate: {
      title: "{zone}",
      content: "Heat index in this area is between 80–90°F (27–32°C). Stay cool and drink water frequently."
    }
  });

  // Add heat zone graphics to the view's graphics collection

  // Toggle Heat Index Visibility
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

  // Filter dropdown functionality
  document.getElementById("stationFilter").addEventListener("change", function () {
    const selected = this.value;
  
    // Remove current layer before re-adding (if needed)
    map.remove(stationLayer);
  
    if (selected === "Hide All") {
      // Do nothing (no layer added), just clear legend
      legend.layerInfos = [];
      return;
    }
  
    const filtered = selected === "All"
      ? graphics
      : graphics.filter(g => g.attributes.Name === selected);
  
    // Recreate stationLayer with filtered graphics
    stationLayer = new FeatureLayer({
      source: filtered.map(g => new Graphic({
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
          { value: "SAGIP Monitor", symbol: monitorDot, label: "SAGIP Monitor" }
        ]
      }
    });
  
    map.add(stationLayer);
    legend.layerInfos = [{ layer: stationLayer, title: "Monitoring Stations" }];
  });


  //Evacuation Zonessss
  let evacuationLayer = null;
let evacuationVisible = false;

const evacuationDot = {
  type: "simple-marker",
  color: "green",
  size: 12,
  outline: { color: "white", width: 1 }
};

const evacuationGraphics = [
  {
    geometry: {
      type: "point",
      longitude: 120.99064047179301,   
      latitude: 14.50293698857822
    },
    symbol: evacuationDot,
    attributes: {
      ObjectID: 101,
      Name: "Don Galo Sports Complex (Don Galo Gym)",
      Description: "Sport's Gym"
    }
  },
  {
    geometry: {
      type: "point",
      longitude: 120.99483138606303,
      latitude: 14.50057820761905
    },
    symbol: evacuationDot,
    attributes: {
      ObjectID: 102,
      Name: "PUP Paranaque Campus",
      Description: "School Campus PUP"
    }
  },
  {
    geometry: {
      type: "point",
      longitude: 120.9911370196004,   
      latitude: 14.505239949916819
    },
    symbol: evacuationDot,
    attributes: {
      ObjectID: 103,
      Name: "Don Galo Barangay Hall",
      Description: "Enrique M Factor Rd, Paranaque City, Metro Manila"
    }
  }
];

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
    evacuationVisible = true;

    // Optional: remove monitoring stations and clear dropdown
    map.remove(stationLayer);
    document.getElementById("stationFilter").value = "All";

  } else {
    map.remove(evacuationLayer);
    legend.layerInfos = [{ layer: stationLayer, title: "Monitoring Stations" }];
    map.add(stationLayer); // bring back station layer if needed
    evacuationVisible = false;
  }
});

  
});