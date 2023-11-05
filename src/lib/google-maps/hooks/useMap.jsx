import React, { useContext } from "react";
import { useState, createContext } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";
import { useRef } from "react";

export const MapContext = createContext();

export function MapProvider({ apikey, options, children }) {
  const map = useRef();
  const [advancedMarker, setAdvancedMarker] = useState(null);

  const mapRef = useRef();

  const value = React.useMemo(() => {
    return { map, advancedMarker, mapRef };
  }, [advancedMarker, map, mapRef]);

  // Map init
  useEffect(() => {
    if (!mapRef.current) return;
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(async () => {
      const newMap = new window.google.maps.Map(mapRef.current, options);

      if (options.featureLayer) {
        const featureLayer = newMap.getFeatureLayer(options.featureLayer.layer);

        featureLayer.style = options.featureLayer.featureStyleCallback;
      }

      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      map.current = newMap;
      setAdvancedMarker({ advancedMarker: AdvancedMarkerElement });
    });
  }, []);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export const useMap = () => useContext(MapContext);
