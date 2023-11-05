import React, { useEffect } from "react";
import ClusterProvider, { useCluster } from "../hooks/useCluster";
import { useMap } from "../hooks/useMap";
import { MarkerClusterer as GoogleMarkerClusterer } from "@googlemaps/markerclusterer";
import * as ReactDOM from "react-dom/client";

export default function MarkerClusterer({ children, customRenderer }) {
  return (
    <ClusterProvider>
      <Cluster customRenderer={customRenderer}>{children}</Cluster>
    </ClusterProvider>
  );
}

function Cluster({ children, customRenderer }) {
  const { markers, setMarkers } = useCluster();
  const { map, advancedMarker } = useMap();

  useEffect(() => {
    if (!map.current || !advancedMarker) return;
    const AdvancedMarkerElement = advancedMarker.advancedMarker;

    if (markers.length > 0) {
      const clustererOptions = {
        map: map.current,
        markers,
      };

      if (customRenderer) {
        clustererOptions.renderer = {
          render: (cluster, stats, map) => {
            const clusterComponent = document.createElement("div");
            const clusterRoot = ReactDOM.createRoot(clusterComponent);
            clusterRoot.render(customRenderer(cluster, stats));
            const clusterMarker = new AdvancedMarkerElement({
              position: cluster.position,
              content: clusterComponent,
              map,
            });
            return clusterMarker;
          },
        };
      }
      const clusterer = new GoogleMarkerClusterer(clustererOptions);
    }
  }, [markers]);

  return <>{children}</>;
}
