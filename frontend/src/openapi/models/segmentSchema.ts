/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * Unleash API
 * OpenAPI spec version: 4.22.0-beta.3
 */
import type { ConstraintSchema } from './constraintSchema';

export interface SegmentSchema {
    id: number;
    name?: string;
    description?: string | null;
    constraints: ConstraintSchema[];
}
