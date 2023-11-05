import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";
import { useRef } from "react";
import * as ReactDOM from "react-dom/client";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import { GiCircleForest } from "react-icons/gi";

let infoComponent;

if (typeof document !== "undefined") {
  infoComponent = document.createElement("div");

  const infoRoot = ReactDOM.createRoot(infoComponent);
  infoRoot.render(
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <span className="material-symbols-outlined text-2xl text-slate-700">
          location_on
        </span>
        <span className="text-slate-700">Location</span>
      </div>
      <div className="flex gap-2">
        <span className="material-symbols-outlined text-2xl text-slate-700">
          phone
        </span>
        <span className="text-slate-700">Phone</span>
      </div>
      <div className="flex gap-2">
        <span className="material-symbols-outlined text-2xl text-slate-700">
          email
        </span>
        <span className="text-slate-700">Email</span>
      </div>
    </div>
  );
}

const featureStyleOptions = {
  strokeColor: "#020617 ",
  strokeOpacity: 1.0,
  strokeWeight: 3.0,
  fillColor: "#020617",
  fillOpacity: 1,
};

export default function ParksMap() {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  // Map init
  useEffect(() => {
    if (!mapRef.current) return;
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    const listeners = [];

    loader.load().then(async () => {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 63.111843, lng: 18.475571 },
        zoom: 5.2,
        mapId: "2ec54b2644414a03",
      });
      const localityLayer = newMap.getFeatureLayer("COUNTRY");

      localityLayer.style = (options) => {
        if (options.feature.placeId !== "ChIJ8fA1bTmyXEYRYm-tjaLruCI") {
          return featureStyleOptions;
        }
        return null;
      };

      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      const markers = locations.map((position, i) => {
        const markerComponent = document.createElement("div");

        /*   infoComponent = document.createElement('div') */
        const markerRoot = ReactDOM.createRoot(markerComponent);
        /*   const infoRoot = ReactDOM.createRoot(infoComponent) */

        markerRoot.render(
          <div
            className={`transition-all duration-500 ease-out hover:-translate-y-1 group relative flex flex-col items-center`}
          >
            {/* <span className="material-symbols-outlined text-5xl">park</span> */}
            <GiCircleForest className="text-5xl bg-yellow-200 group-hover:bg-yellow-100 group-hover:fill-yellow-800 fill-yellow-700 rounded-full transition-colors" />
          </div>
        );

        const marker = new AdvancedMarkerElement({
          position,
          content: markerComponent,
        });

        const infoComponent = document.createElement("div");

        /*   infoComponent = document.createElement('div') */
        const infoRoot = ReactDOM.createRoot(infoComponent);
        /*   const infoRoot = ReactDOM.createRoot(infoComponent) */

        infoRoot.render(
          <div className={``}>
            <div className="bg-slate-950 text-white p-4 relative -top-full left-0 right-0">
              {position.name}
            </div>
          </div>
        );

        const infowindow = new google.maps.InfoWindow({
          content: infoComponent,
          ariaLabel: position.name,
        });

        const mapsClickListener = google.maps.event.addListener(
          newMap,
          "click",
          function (event) {
            infowindow.close();
          }
        );

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        const listener = marker.addListener("click", () => {
          infowindow.close();
          infowindow.open({
            anchor: marker,
            map: newMap,
          });
        });
        listeners.push(listener);

        return marker;
      });

      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({
        markers,
        map: newMap,
        renderer: {
          render: (cluster, stats, map) => {
            const clusterComponent = document.createElement("div");
            const clusterRoot = ReactDOM.createRoot(clusterComponent);
            clusterRoot.render(
              <div className="flex items-center justify-center rounded-full">
                <GiCircleForest className="text-5xl bg-yellow-700/80 fill-yellow-700 rounded-full" />
                <span className="absolute bottom-2 text-xl text-white text-center left-0 right-0">
                  {String(cluster.markers.length)}
                </span>
              </div>
            );
            const clusterMarker = new AdvancedMarkerElement({
              position: cluster.position,
              content: clusterComponent,
              map,
            });
            return clusterMarker;
          },
        },
      });
    });
    return () => {
      listeners.forEach((listener) => listener.remove());
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-900 relative">
      <div ref={mapRef} className="min-h-full w-full bg-slate-900"></div>
    </div>
  );
}

const locations = [
  { lat: 68.320683, lng: 18.693237, name: "Abisko nationalpark", id: 1 },
  { lat: 59.28009, lng: 14.891796, name: "Garphyttans nationalpark", id: 2 },
  { lat: 58.36823699999999, lng: 19.263153, name: "Gotska Sandön", id: 3 },
  {
    lat: 61.763296999999994,
    lng: 14.755325,
    name: "Hamra nationalpark",
    id: 4,
  },
  { lat: 66.352933, lng: 16.791229, name: "Pieljekaise nationalpark", id: 5 },
  { lat: 67.286894, lng: 17.613831, name: "Sarek nationalpark", id: 6 },
  {
    lat: 67.566286,
    lng: 17.83905,
    name: "Stora Sjöfallet nationalpark",
    id: 7,
  },
  {
    lat: 62.280061999999994,
    lng: 13.566055,
    name: "Sånfjället nationalpark",
    id: 8,
  },
  { lat: 59.623586, lng: 18.76276, name: "Ängsö nationalpark", id: 9 },
  {
    lat: 55.675528,
    lng: 13.331180000000002,
    name: "Dalby Söderskog nationalpark",
    id: 10,
  },
  { lat: 68.542557, lng: 18.422012, name: "Vadvetjåkka nationalpark", id: 11 },
  {
    lat: 57.252193000000005,
    lng: 16.792002,
    name: "Blå Jungfrun nationalpark",
    id: 12,
  },
  {
    lat: 57.763760000000005,
    lng: 15.595521999999999,
    name: "Norra Kvill nationalpark",
    id: 13,
  },
  {
    lat: 62.165261,
    lng: 12.476349,
    name: "Töfsingdalen nationalpark",
    id: 14,
  },
  { lat: 66.918219, lng: 20.247803, name: "Muddus nationalpark", id: 15 },
  { lat: 67.410653, lng: 16.690979, name: "Padjelanta nationalpark", id: 16 },
  { lat: 57.28461, lng: 13.930664, name: "Store Mosse nationalpark", id: 17 },
  {
    lat: 58.716716000000005,
    lng: 14.616280000000001,
    name: "Tiveden nationalpark",
    id: 18,
  },
  { lat: 63.111843, lng: 18.475571, name: "Skuleskogen nationalpark", id: 19 },
  { lat: 55.656962, lng: 14.265833, name: "Stenshuvud nationalpark", id: 20 },
  { lat: 63.980856, lng: 18.016548, name: "Björnlandet nationalpark", id: 21 },
  { lat: 58.855495, lng: 13.467178, name: "Djurö nationalpark", id: 22 },
  { lat: 59.184371, lng: 18.277988, name: "Tyresta nationalpark", id: 23 },
  {
    lat: 65.57692,
    lng: 23.747292,
    name: "Haparanda Skärgård nationalpark",
    id: 24,
  },
  { lat: 59.026157, lng: 11.754856, name: "Trestickland nationalpark", id: 25 },
  {
    lat: 60.20059199999999,
    lng: 16.768227,
    name: "Färnebofjärden nationalpark",
    id: 26,
  },
  { lat: 56.023524, lng: 13.233204, name: "Söderåsen nationalpark", id: 27 },
  { lat: 61.547567, lng: 12.767487, name: "Fulufjället nationalpark", id: 28 },
  { lat: 58.831515, lng: 11.026154, name: "Kosterhavets nationalpark", id: 29 },
];
