
import React from 'react';
import { OrbitalElements } from '../types';

interface OrbitalVisualizerProps {
  elements: OrbitalElements;
}

const OrbitalVisualizer: React.FC<OrbitalVisualizerProps> = ({ elements }) => {
  const {
    semiMajorAxis: a,
    eccentricity: e,
    inclination: i,
    longitudeOfAscendingNode: Omega,
    argumentOfPeriapsis: omega,
    trueAnomaly: v,
  } = elements;

  const width = 500;
  const height = 500;
  const viewBox = `-${width / 2} -${height / 2} ${width} ${height}`;

  // Calculate properties of the ellipse
  const semiMinorAxis = a * Math.sqrt(1 - e * e);
  const focusDistance = a * e;

  // Generate points for the ellipse path
  const points = Array.from({ length: 361 }, (_, angle) => {
    const rad = angle * (Math.PI / 180);
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(rad));
    const x = r * Math.cos(rad) - focusDistance;
    const y = r * Math.sin(rad);
    return `${x},${y}`;
  }).join(' ');

  // Calculate satellite position
  const trueAnomalyRad = v * (Math.PI / 180);
  const rSatellite = (a * (1 - e * e)) / (1 + e * Math.cos(trueAnomalyRad));
  const satelliteX = rSatellite * Math.cos(trueAnomalyRad) - focusDistance;
  const satelliteY = rSatellite * Math.sin(trueAnomalyRad);
  
  // Styles for 3D transformation
  const perspectiveStyle: React.CSSProperties = {
    perspective: '1000px',
    transformStyle: 'preserve-3d',
  };

  const containerStyle: React.CSSProperties = {
    transform: `rotateZ(${Omega}deg) rotateX(${i}deg) rotateZ(${omega}deg)`,
    transformStyle: 'preserve-3d',
  };

  return (
    <div className="relative w-full aspect-square bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden p-4">
      <div style={perspectiveStyle} className="w-full h-full">
        <svg viewBox={viewBox} className="w-full h-full" style={{transform: `rotateX(10deg)`}}>
          {/* Reference Plane */}
          <g opacity="0.3">
            <circle cx="0" cy="0" r="200" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="120" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="0"cy="0" r="50" fill="none" stroke="#475569" strokeWidth="1" />
            <line x1="-250" y1="0" x2="250" y2="0" stroke="#475569" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="-250" x2="0" y2="250" stroke="#475569" strokeWidth="0.5" strokeDasharray="4 4" />
          </g>

          {/* 3D transformations applied to this group */}
          <g style={containerStyle} transform-origin="center">
            {/* Line of Apsides */}
             <line 
                x1={-focusDistance - a} y1={0} 
                x2={-focusDistance + a} y2={0}
                stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 2"
            />

            {/* Orbit Path */}
            <polygon
              points={points}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            
            {/* Satellite */}
            <circle cx={satelliteX} cy={satelliteY} r="5" fill="#f1f5f9" stroke="#06b6d4" strokeWidth="1" />

          </g>
          
          {/* Central Body */}
          <circle cx="0" cy="0" r="10" fill="#f59e0b" />
          <circle cx="0" cy="0" r="15" fill="#f59e0b" opacity="0.3" />

        </svg>
      </div>
    </div>
  );
};

export default OrbitalVisualizer;
