import React from "react";
import { Supercluster } from "../types/supercluster";

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
    console.log(selectedId);
    const selectedSuperclusterObject =
      options.find((sc) => sc.id === selectedId) || null;
    onSelect(selectedSuperclusterObject!);
  };

  return (
    // <div className="w-full md:w-1/2 lg:w-1/3 p-6 mx-auto text-center">
    //   <div className="p-8 bg-miami-blue border-2 border-miami-pink text-black rounded-lg shadow-xl">
    //     <h1 className="text-2xl font-bold text-miami-pink mb-4">{title}</h1>
    //     <select
    //       className="block w-full bg-miami-blue text-miami-pink p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-miami-pink"
    //       value={selectedValue?.id || ""}
    //       onChange={handleSelectChange}
    //     >
    //       <option value="" disabled>
    //         -- Choose an option --
    //       </option>
    //       {options.map((option) => (
    //         <option key={option.id} value={option.id}>
    //           {option.name}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    // </div>
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
};

export default SuperclusterBox;
