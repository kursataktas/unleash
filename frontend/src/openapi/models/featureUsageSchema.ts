/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * Unleash API
 * OpenAPI spec version: 4.22.0-beta.3
 */
import type { FeatureEnvironmentMetricsSchema } from './featureEnvironmentMetricsSchema';

export interface FeatureUsageSchema {
    version: number;
    maturity: string;
    featureName: string;
    lastHourUsage: FeatureEnvironmentMetricsSchema[];
    seenApplications: string[];
}
