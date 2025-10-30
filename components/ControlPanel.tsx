
import React from 'react';
import { OrbitalElements, OrbitalElementKey } from '../types';
import { ORBITAL_ELEMENT_DEFINITIONS } from '../constants';
import SliderInput from './SliderInput';

interface ControlPanelProps {
  elements: OrbitalElements;
  onUpdate: (key: OrbitalElementKey, value: number) => void;
  onFocus: (key: OrbitalElementKey | null) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ elements, onUpdate, onFocus, isAnimating, setIsAnimating }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 md:p-6 border border-slate-700 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-slate-100 mb-4">Orbital Parameters</h2>
      <div className="space-y-4 flex-grow">
        {ORBITAL_ELEMENT_DEFINITIONS.map(def => (
          <SliderInput
            key={def.key}
            definition={def}
            value={elements[def.key]}
            onUpdate={(value) => onUpdate(def.key, value)}
            onFocus={() => onFocus(def.key)}
            onBlur={() => onFocus(null)}
            disabled={def.key === 'trueAnomaly' && isAnimating}
          />
        ))}
      </div>
       <div className="mt-6 flex items-center justify-between bg-slate-700/50 p-3 rounded-md">
        <label htmlFor="animation-toggle" className="text-sm font-medium text-slate-200">
          Animate True Anomaly
        </label>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${isAnimating ? 'bg-cyan-500' : 'bg-slate-600'}`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${isAnimating ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
