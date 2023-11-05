import { GiCircleForest } from "react-icons/gi";
import { GoogleMap, MarkerClusterer, Marker } from "../lib/google-maps";

const featureStyleOptions = {
  strokeColor: "#020617 ",
  strokeOpacity: 1.0,
  strokeWeight: 3.0,
  fillColor: "#020617",
  fillOpacity: 1,
};

function ClusterComponent({ content }) {
  return (
    <div className="flex items-center justify-center rounded-full">
      <GiCircleForest className="text-5xl bg-yellow-700/80 fill-yellow-700 rounded-full" />
      <span className="absolute bottom-2 text-xl text-white text-center left-0 right-0">
        {content}
      </span>
    </div>
  );
}

export default function NewParksMap() {
  return (
    <GoogleMap
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      options={{
        center: { lat: 63.111843, lng: 18.475571 },
        zoom: 5.2,
        mapId: "2ec54b2644414a03",
        featureLayer: {
          layer: "COUNTRY",
          featureStyleCallback: (options) => {
            if (options.feature.placeId !== "ChIJ8fA1bTmyXEYRYm-tjaLruCI") {
              return featureStyleOptions;
            }
            return null;
          },
        },
      }}
    >
      <MarkerClusterer
        customRenderer={(cluster, stats) => (
          <ClusterComponent content={String(cluster.markers.length)} />
        )}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            onClick={() => console.log("clicked " + location.name)}
            position={{ lat: location.lat, lng: location.lng }}
            customElement={
              <div
                className={`transition-all duration-500 ease-out hover:-translate-y-1 group relative flex flex-col items-center`}
              >
                <GiCircleForest className="text-5xl bg-yellow-200 group-hover:bg-yellow-100 group-hover:fill-yellow-800 fill-yellow-700 rounded-full transition-colors" />
              </div>
            }
          />
        ))}
      </MarkerClusterer>
    </GoogleMap>
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
