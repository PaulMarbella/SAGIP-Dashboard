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
        zoom: 18
      });

      const sagipDot = {
        type: "simple-marker",
        color: "red",
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
        }
      ];

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
            { value: "SAGIP Monitor", symbol: monitorDot, label: "SAGIP Monitor" }
          ]
        }
      });

      map.add(stationLayer);

      const legend = new Legend({
        view: view,
        layerInfos: [{ layer: stationLayer, title: "Legend: " }]
      });

      view.ui.add(legend, "bottom-left");

      // Filter dropdown
      document.getElementById("stationFilter").addEventListener("change", function () {
        const selected = this.value;
        const filtered = selected === "All"
          ? graphics
          : graphics.filter(g => g.attributes.Name === selected);

        // Remove and re-add filtered graphics
        map.remove(stationLayer);
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
    });