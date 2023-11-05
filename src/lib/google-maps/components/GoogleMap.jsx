import { MapProvider, useMap } from "../hooks/useMap";

export default function GoogleMap({ options, children }) {
  return (
    <MapProvider options={options}>
      <Map>{children}</Map>
    </MapProvider>
  );
}

function Map({ children }) {
  const { mapRef } = useMap();

  return (
    <div ref={mapRef} style={{ height: "100%", width: "100%" }}>
      {children}
    </div>
  );
}
