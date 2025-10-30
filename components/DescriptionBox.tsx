
import React from 'react';
import { OrbitalElementDefinition } from '../types';

interface DescriptionBoxProps {
  definition: OrbitalElementDefinition | null;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ definition }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 md:p-6 border border-slate-700 min-h-[120px] transition-all duration-300 ease-in-out">
      {definition ? (
        <>
          <h3 className="text-md font-semibold text-cyan-400 mb-2">
            {definition.label} ({definition.symbol})
          </h3>
          <p className="text-sm text-slate-300">
            {definition.longDescription}
          </p>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-center">
              Hover over or focus on a parameter to learn more about it.
            </p>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
