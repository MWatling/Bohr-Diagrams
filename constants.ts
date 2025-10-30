
import { OrbitalElementDefinition } from './types';

export const GITHUB_URL = "https://github.com/google/genaui";

export const ORBITAL_ELEMENT_DEFINITIONS: OrbitalElementDefinition[] = [
  {
    key: 'semiMajorAxis',
    label: 'Semi-Major Axis',
    symbol: 'a',
    unit: 'km',
    min: 50,
    max: 200,
    step: 1,
    description: "Controls the orbit's size.",
    longDescription: "The semi-major axis defines the size of the orbit. It is half of the longest diameter of the elliptical orbit, running from the center, through a focus, and to the perimeter."
  },
  {
    key: 'eccentricity',
    label: 'Eccentricity',
    symbol: 'e',
    unit: '',
    min: 0,
    max: 0.99,
    step: 0.01,
    description: "Defines the orbit's shape.",
    longDescription: "Eccentricity determines how much the orbit deviates from a perfect circle. A value of 0 is a circular orbit, while values between 0 and 1 create an increasingly elongated ellipse."
  },
  {
    key: 'inclination',
    label: 'Inclination',
    symbol: 'i',
    unit: '°',
    min: 0,
    max: 180,
    step: 1,
    description: "Tilts the orbital plane.",
    longDescription: "Inclination is the angle between the orbital plane and a reference plane (e.g., the equatorial plane). It defines the tilt of the orbit. An inclination of 0° is an equatorial orbit, and 90° is a polar orbit."
  },
  {
    key: 'longitudeOfAscendingNode',
    label: 'Long. of Ascending Node',
    symbol: 'Ω',
    unit: '°',
    min: 0,
    max: 360,
    step: 1,
    description: "Swivels the orbital plane.",
    longDescription: "The Longitude of the Ascending Node horizontally orients the ascending node of the orbit, which is the point where the satellite crosses the reference plane from south to north. It effectively swivels the orbital plane."
  },
  {
    key: 'argumentOfPeriapsis',
    label: 'Argument of Periapsis',
    symbol: 'ω',
    unit: '°',
    min: 0,
    max: 360,
    step: 1,
    description: "Rotates the orbit within its plane.",
    longDescription: "The Argument of Periapsis defines the orientation of the ellipse in the orbital plane. It is the angle from the ascending node to the periapsis (the point of closest approach to the central body)."
  },
  {
    key: 'trueAnomaly',
    label: 'True Anomaly',
    symbol: 'ν',
    unit: '°',
    min: 0,
    max: 360,
    step: 1,
    description: "Positions the satellite on the orbit.",
    longDescription: "The True Anomaly is the angle between the direction of periapsis and the current position of the orbiting body, as seen from the main focus of the ellipse. It defines the satellite's position along its orbit at a specific time."
  }
];
