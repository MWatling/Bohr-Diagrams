import React from 'react';
import { BohrElementData } from '../types';

interface BohrDiagramProps {
    data: BohrElementData;
}

const BohrDiagram: React.FC<BohrDiagramProps> = ({ data }) => {
    const nucleusRadius = 25;
    const shellBaseRadius = nucleusRadius + 20; // Start of first shell from center
    const shellSpacing = 35;
    const electronRadius = 5;
    const padding = 20;

    const numShells = data.electronsPerShell.length;

    // Calculate the radius of the circle on which the outermost electrons orbit
    const outermostShellRadius = numShells > 0 ? shellBaseRadius + numShells * shellSpacing : shellBaseRadius;
    
    // The total radius needed is the outermost shell's radius plus the electron's radius
    const requiredRadius = outermostShellRadius + electronRadius;

    // The size of the viewBox should be at least 400, or larger if needed, with padding
    const size = Math.max(400, requiredRadius * 2 + padding);
    
    const centerX = size / 2;
    const centerY = size / 2;

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <h3 className="text-2xl font-bold text-cyan-400">{data.name} ({data.symbol})</h3>
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm" aria-label={`Bohr diagram for ${data.name}`}>
                 <defs>
                    <style>
                        {`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes scaleIn {
                             from { transform: scale(0.5); opacity: 0; }
                             to { transform: scale(1); opacity: 1; }
                        }
                        .fade-in {
                            animation: fadeIn 0.8s ease-in-out forwards;
                        }
                        .scale-in {
                            animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
                        }
                        `}
                    </style>
                </defs>
                <g className="fade-in">
                    {/* Shells */}
                    {data.electronsPerShell.map((_, shellIndex) => {
                        const radius = shellBaseRadius + (shellIndex + 1) * shellSpacing;
                        return (
                            <circle
                                key={`shell-${shellIndex}`}
                                cx={centerX}
                                cy={centerY}
                                r={radius}
                                fill="none"
                                stroke="#475569"
                                strokeWidth="1"
                                style={{ animationDelay: `${shellIndex * 100}ms` }}
                                className="fade-in"
                            />
                        );
                    })}

                    {/* Electrons */}
                    {data.electronsPerShell.flatMap((electronCount, shellIndex) => {
                        const radius = shellBaseRadius + (shellIndex + 1) * shellSpacing;
                        const electrons = [];
                        for (let i = 0; i < electronCount; i++) {
                            const angle = (i / electronCount) * 2 * Math.PI + (shellIndex * 0.5);
                            const ex = centerX + radius * Math.cos(angle);
                            const ey = centerY + radius * Math.sin(angle);
                            electrons.push(
                                <circle
                                    key={`electron-${shellIndex}-${i}`}
                                    cx={ex}
                                    cy={ey}
                                    r={electronRadius}
                                    fill="#f1f5f9"
                                    className="scale-in"
                                    style={{ 
                                        animationDelay: `${200 + shellIndex * 150 + i * 50}ms`,
                                        transformOrigin: `${centerX}px ${centerY}px`
                                    }}
                                />
                            );
                        }
                        return electrons;
                    })}

                    {/* Nucleus */}
                    <g className="scale-in" style={{ animationDelay: '100ms' }}>
                        <circle cx={centerX} cy={centerY} r={nucleusRadius} fill="#f59e0b" />
                        <circle cx={centerX} cy={centerY} r={nucleusRadius + 5} fill="#f59e0b" opacity="0.3" />
                        <text
                            x={centerX}
                            y={centerY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#1e293b"
                            fontSize="20"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                        >
                            {data.symbol}
                        </text>
                    </g>
                </g>
            </svg>
            <p className="text-slate-300 font-mono">
                Electron Configuration: {data.electronsPerShell.join(', ')}
            </p>
        </div>
    );
};

export default BohrDiagram;