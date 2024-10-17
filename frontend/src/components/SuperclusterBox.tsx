import React from "react";
import { Supercluster } from "../types/supercluster";

interface SuperclusterBoxProps {
  title: string;
  options: Supercluster[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SuperclusterBox: React.FC<SuperclusterBoxProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-6 mx-auto text-center">
      <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
        <select
          className="block w-full bg-miami-blue text-miami-pink p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
          value={selectedValue}
          onChange={(e) => {
            console.log(e);
            onSelect(e.target.value);
          }}
        >
          <option value="" disabled>
            -- Choose an option --
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
};

export default SuperclusterBox;
