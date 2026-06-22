import React from "react";
import { Supercluster } from "../lib/types";

interface SuperclusterBoxProps {
  title: string;
  options: Supercluster[];
  selectedValue: Supercluster | null;
  onSelect: (value: Supercluster) => void;
}

const SuperclusterBox: React.FC<SuperclusterBoxProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedSuperclusterObject =
      options.find((sc) => sc.id === selectedId) || null;
    onSelect(selectedSuperclusterObject!);
  };

  if (selectedValue === null) {
    return (
      <div className="w-[420px] p-6 text-center">
        <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
          <select
            className="block w-full bg-miami-blue text-miami-pink p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
            value={selectedValue?.id || ""}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              -- Choose a Supercluster --
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{selectedValue.name}</h1>
        <h1>{selectedValue.id}</h1>
        <h1>{selectedValue.numberOfGalaxies}</h1>
        <h1>{selectedValue.xCoordinate}</h1>
        <h1>{selectedValue.yCoordinate}</h1>
        <h1>{selectedValue.zCoordinate}</h1>
      </div>
    );
  }
};

export default SuperclusterBox;
