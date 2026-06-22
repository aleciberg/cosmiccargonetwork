import React from "react";

interface SelectionBoxProps<T> {
  title: string;
  options: T[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
  onClear?: () => void;
  getOptionId: (option: T) => string;
  getOptionName: (option: T) => string;
  placeholder?: string;
  disabled?: boolean;
}

const SelectionBox = <T,>({
  title,
  options,
  selectedValue,
  onSelect,
  onClear,
  getOptionId,
  getOptionName,
  placeholder = "-- Choose an option --",
  disabled = false,
}: SelectionBoxProps<T>) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedOption = options.find(
      (opt) => getOptionId(opt) === selectedId
    );
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  if (selectedValue === null) {
    return (
      <div className="w-full max-w-md p-6">
        <div className="p-8 bg-space-gray border-2 border-nebula-purple text-starlight-white rounded-lg shadow-xl glow-purple">
          <h2 className="text-2xl font-bold text-nebula-purple-light mb-4">{title}</h2>
          <select
            className="block w-full bg-space-dark text-starlight-white p-3 border-2 border-nebula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:glow-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            value=""
            onChange={handleSelectChange}
            disabled={disabled || options.length === 0}
          >
            <option value="" disabled>
              {options.length === 0 ? "Loading..." : placeholder}
            </option>
            {options.map((option) => (
              <option key={getOptionId(option)} value={getOptionId(option)} className="bg-space-dark">
                {getOptionName(option)}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-md p-6">
        <div className="p-8 bg-space-gray border-2 border-nebula-purple text-starlight-white rounded-lg shadow-xl glow-purple">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-nebula-purple-light">{title}</h2>
            {onClear && (
              <button
                onClick={onClear}
                className="px-3 py-1 text-sm bg-nebula-purple text-white rounded hover:bg-nebula-purple-dark hover:glow-purple transition-all"
              >
                Clear
              </button>
            )}
          </div>
          <div className="bg-space-dark p-4 rounded-md border-2 border-nebula-purple">
            <p className="text-xl font-semibold text-starlight-white">
              {getOptionName(selectedValue)}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default SelectionBox;


