import React from "react";
import { Quote } from "../lib/types";

interface QuoteDisplayProps {
  quote: Quote;
  onNewQuote: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, onNewQuote }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-2xl p-6">
      <div className="p-8 bg-space-gray border-2 border-nebula-purple text-starlight-white rounded-lg shadow-xl glow-purple-strong">
        <h2 className="text-2xl font-bold text-nebula-purple-light mb-6">
          Shipping Quote
        </h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-starlight-gray">Base Cost:</span>
            <span className="text-starlight-white">{formatCurrency(quote.baseCost)}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-starlight-gray">Distance Cost:</span>
            <span className="text-starlight-white">{formatCurrency(quote.distanceCost)}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-starlight-gray">Origin Tax:</span>
            <span className="text-starlight-white">{formatCurrency(quote.originTax)}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-starlight-gray">Origin Political Fee:</span>
            <span className="text-starlight-white">{formatCurrency(quote.originPoliticalFee)}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-starlight-gray">Destination Tax:</span>
            <span className="text-starlight-white">{formatCurrency(quote.destinationTax)}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-starlight-gray">Destination Political Fee:</span>
            <span className="text-starlight-white">{formatCurrency(quote.destinationPoliticalFee)}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark p-3 rounded border border-nebula-purple">
            <span className="font-semibold text-starlight-gray">Cargo-Specific Cost:</span>
            <span className="text-starlight-white">{formatCurrency(quote.cargoCost)}</span>
          </div>
          <div className="flex justify-between items-center bg-space-dark p-4 rounded border-2 border-star-gold mt-4 glow-gold">
            <span className="font-bold text-lg text-star-gold-light">Total:</span>
            <span className="font-bold text-lg text-star-gold">
              {formatCurrency(quote.total)}
            </span>
          </div>
        </div>
        <button
          onClick={onNewQuote}
          className="w-full px-6 py-3 bg-gradient-to-r from-nebula-purple to-nebula-purple-dark text-white rounded-md hover:glow-purple-strong transition-all font-semibold text-lg border border-nebula-purple-light"
        >
          Calculate New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteDisplay;


