
import React from 'react';
import { OrbitalElementDefinition } from '../types';

interface SliderInputProps {
  definition: OrbitalElementDefinition;
  value: number;
  onUpdate: (value: number) => void;
  onFocus: () => void;
  onBlur: () => void;
  disabled?: boolean;
}

const SliderInput: React.FC<SliderInputProps> = ({ definition, value, onUpdate, onFocus, onBlur, disabled }) => {
  const { key, label, symbol, unit, min, max, step } = definition;

  return (
    <div 
        className="flex flex-col space-y-2"
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        onFocus={onFocus}
        onBlur={onBlur}
    >
      <div className="flex justify-between items-baseline">
        <label htmlFor={key} className="text-sm font-medium text-slate-300">
          {label} ({symbol})
        </label>
        <span className="text-sm font-mono text-cyan-400 bg-slate-700/50 px-2 py-0.5 rounded">
          {value.toFixed(symbol === 'e' ? 2 : 0)}{unit}
        </span>
      </div>
      <input
        type="range"
        id={key}
        name={key}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onUpdate(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-cyan-500/50 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:border-none"
      />
    </div>
  );
};

export default SliderInput;
