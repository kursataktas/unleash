/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * Unleash API
 * OpenAPI spec version: 4.22.0-beta.3
 */
import type { RoleSchema } from './roleSchema';
import type { FeatureSchema } from './featureSchema';

export interface ProfileSchema {
    rootRole: RoleSchema;
    projects: string[];
    features: FeatureSchema[];
}
