"use client";

import React, { useState } from "react";
import { Cargo } from "../lib/types";

interface CargoFormProps {
  onSubmit: (cargo: Cargo) => void;
}

const CargoForm: React.FC<CargoFormProps> = ({ onSubmit }) => {
  const [cargo, setCargo] = useState<Cargo>({
    type: "",
    weight: 0,
    volume: undefined,
    value: undefined,
    specialHandling: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Cargo, string>>>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCargo((prev) => ({
      ...prev,
      [name]:
        name === "weight" || name === "volume" || name === "value"
          ? parseFloat(value) || 0
          : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof Cargo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Cargo, string>> = {};

    if (!cargo.type.trim()) {
      newErrors.type = "Cargo type is required";
    }
    if (cargo.weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(cargo);
  };

  return (
    <div className="w-full max-w-2xl p-6">
      <div className="p-8 bg-space-gray border-2 border-nebula-purple text-starlight-white rounded-lg shadow-xl glow-purple">
        <h2 className="text-2xl font-bold text-nebula-purple-light mb-6">
          Cargo Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-semibold mb-2 text-starlight-white"
            >
              Cargo Type <span className="text-supernova-red">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={cargo.type}
              onChange={handleChange}
              className={`block w-full bg-space-dark text-starlight-white p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:glow-purple transition-all ${
                errors.type ? "border-supernova-red" : "border-nebula-purple"
              }`}
            >
              <option value="" className="bg-space-dark">-- Select cargo type --</option>
              <option value="standard" className="bg-space-dark">Standard</option>
              <option value="fragile" className="bg-space-dark">Fragile</option>
              <option value="hazardous" className="bg-space-dark">Hazardous</option>
              <option value="perishable" className="bg-space-dark">Perishable</option>
              <option value="valuable" className="bg-space-dark">Valuable</option>
              <option value="bulk" className="bg-space-dark">Bulk</option>
            </select>
            {errors.type && (
              <p className="text-supernova-red text-sm mt-1">{errors.type}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-semibold mb-2 text-starlight-white"
            >
              Weight (kg) <span className="text-supernova-red">*</span>
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={cargo.weight || ""}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`block w-full bg-space-dark text-starlight-white p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:glow-purple transition-all ${
                errors.weight ? "border-supernova-red" : "border-nebula-purple"
              }`}
            />
            {errors.weight && (
              <p className="text-supernova-red text-sm mt-1">{errors.weight}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="volume"
              className="block text-sm font-semibold mb-2 text-starlight-white"
            >
              Volume (m³) <span className="text-starlight-gray">(optional)</span>
            </label>
            <input
              type="number"
              id="volume"
              name="volume"
              value={cargo.volume || ""}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="block w-full bg-space-dark text-starlight-white p-3 border-2 border-nebula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:glow-purple transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="value"
              className="block text-sm font-semibold mb-2 text-starlight-white"
            >
              Value (credits) <span className="text-starlight-gray">(optional)</span>
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={cargo.value || ""}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="block w-full bg-space-dark text-starlight-white p-3 border-2 border-nebula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:glow-purple transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="specialHandling"
              className="block text-sm font-semibold mb-2 text-starlight-white"
            >
              Special Handling Requirements{" "}
              <span className="text-starlight-gray">(optional)</span>
            </label>
            <textarea
              id="specialHandling"
              name="specialHandling"
              value={cargo.specialHandling || ""}
              onChange={handleChange}
              rows={3}
              className="block w-full bg-space-dark text-starlight-white p-3 border-2 border-nebula-purple rounded-md focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:glow-purple transition-all"
              placeholder="Any special handling requirements..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-nebula-purple to-nebula-purple-dark text-white rounded-md hover:glow-purple-strong transition-all font-semibold text-lg border border-nebula-purple-light"
          >
            Calculate Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default CargoForm;


