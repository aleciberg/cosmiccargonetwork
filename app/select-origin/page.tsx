"use client";

import { useState, useEffect } from "react";
import SuperclusterBox from "../components/Supercluster";
import { Supercluster } from "../lib/types";

const SelectOriginPage = () => {
  const [superclusters, setSuperclusters] = useState<Supercluster[]>([]);
  const [selectedOriginSupercluster, setSelectedOriginSupercluster] =
    useState<Supercluster | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch superclusters when the page loads
  useEffect(() => {
    const fetchSuperclusters = async () => {
      const url = "http://localhost:1323/superclusters";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const transformedData: Supercluster[] = json.map((item: any) => ({
          id: item.ID,
          name: item.Name,
          numberOfGalaxies: item.NumberOfGalaxies,
          xCoordinate: item.XCoordinate,
          yCoordinate: item.YCoordinate,
          zCoordinate: item.ZCoordinate,
        }));
        setSuperclusters(transformedData);
        setLoading(false);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchSuperclusters();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SuperclusterBox
      title="Origin Route Summary"
      options={superclusters}
      selectedValue={selectedOriginSupercluster}
      onSelect={setSelectedOriginSupercluster}
    />
  );
};

export default SelectOriginPage;
