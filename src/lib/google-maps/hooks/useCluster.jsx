import React, { useContext, useState } from "react";

const ClusterContext = React.createContext();

export default function ClusterProvider({ children }) {
  const [markers, setMarkers] = useState([]);
  return (
    <ClusterContext.Provider value={{ markers, setMarkers }}>
      {children}
    </ClusterContext.Provider>
  );
}

export const useCluster = () => useContext(ClusterContext);
