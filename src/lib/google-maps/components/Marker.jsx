import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import { useMap } from "../hooks/useMap";
import { useCluster } from "../hooks/useCluster";

export default function Marker({ position, customElement, onClick }) {
  const { map, advancedMarker } = useMap();
  const { markers, setMarkers } = useCluster() || {};

  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (!map.current || !advancedMarker || hasRendered) return;
    let listeners = [];
    const AdvancedMarkerElement = advancedMarker.advancedMarker;

    let content;

    if (customElement) {
      const markerComponent = document.createElement("div");
      const markerRoot = ReactDOM.createRoot(markerComponent);

      markerRoot.render(customElement);
      content = markerComponent;
    }

    const marker = new AdvancedMarkerElement({
      map: markers ? undefined : map.current,
      position,
      content,
    });

    if (onClick) {
      const listener = marker.addListener("click", onClick);
      listeners.push(listener);
    }

    setHasRendered(true);

    if (markers) {
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }

    return () => {
      listeners.forEach((listener) =>
        window.google.maps.event.removeListener(listener)
      );
    };
  }, [position, customElement, map.current, advancedMarker]);

  return <></>;
}
