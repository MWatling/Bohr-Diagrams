export interface BohrElementData {
    name: string;
    symbol: string;
    atomicNumber: number;
    electronsPerShell: number[];
}

// FIX: Added missing type definitions for orbital visualizer components.
export type OrbitalElementKey =
  | 'semiMajorAxis'
  | 'eccentricity'
  | 'inclination'
  | 'longitudeOfAscendingNode'
  | 'argumentOfPeriapsis'
  | 'trueAnomaly';

export interface OrbitalElementDefinition {
  key: OrbitalElementKey;
  label: string;
  symbol: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  description: string;
  longDescription: string;
}

export type OrbitalElements = Record<OrbitalElementKey, number>;
