"use client";

import React from "react";

interface ProgressTrackerProps {
  currentStep: "origin" | "destination" | "cargo" | "quote";
  originComplete: boolean;
  destinationComplete: boolean;
  cargoComplete: boolean;
  quoteComplete: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentStep,
  originComplete,
  destinationComplete,
  cargoComplete,
  quoteComplete,
}) => {
  const steps = [
    {
      id: "origin",
      label: "Origin",
      complete: originComplete,
      active: currentStep === "origin",
    },
    {
      id: "destination",
      label: "Destination",
      complete: destinationComplete,
      active: currentStep === "destination",
    },
    {
      id: "cargo",
      label: "Cargo",
      complete: cargoComplete,
      active: currentStep === "cargo",
    },
    {
      id: "quote",
      label: "Quote",
      complete: quoteComplete,
      active: currentStep === "quote",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-nebula-purple-light mb-4">Progress</h3>
      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-center gap-3 py-3">
              {/* Step Number/Checkmark Circle */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step.complete
                      ? "bg-nebula-purple text-white glow-purple"
                      : step.active
                      ? "bg-nebula-purple text-white ring-2 ring-nebula-purple-light ring-offset-2 ring-offset-space-gray glow-purple"
                      : "bg-space-dark border-2 border-starlight-gray text-starlight-gray"
                  }`}
                >
                  {step.complete ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {/* Connector Line (except for last step) */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-1/2 top-8 w-0.5 h-6 -translate-x-1/2 transition-colors ${
                      step.complete ? "bg-nebula-purple" : "bg-starlight-gray opacity-30"
                    }`}
                  />
                )}
              </div>

              {/* Step Label */}
              <div className="flex-1">
                <div
                  className={`font-semibold transition-colors ${
                    step.complete
                      ? "text-nebula-purple-light"
                      : step.active
                      ? "text-nebula-purple-light"
                      : "text-starlight-gray opacity-60"
                  }`}
                >
                  {step.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;

