import { featureDetails1 } from './feature-details-1.js';
import { featureDetails2 } from './feature-details-2.js';

/** All 12 feature detail entries */
export const featureDetails = [...featureDetails1, ...featureDetails2];

/** Get a single feature by its ID */
export const getFeatureById = (id) =>
  featureDetails.find((f) => f.id === id) ?? null;

/** Get features filtered by category */
export const getFeaturesByCategory = (category) =>
  featureDetails.filter((f) => f.category === category);

/** All unique feature categories */
export const featureCategories = [
  ...new Set(featureDetails.map((f) => f.category)),
];
