/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * Unleash API
 * OpenAPI spec version: 4.22.0-beta.3
 */
import type { LegalValueSchema } from './legalValueSchema';

export interface ContextFieldSchema {
    name: string;
    description?: string;
    stickiness?: boolean;
    sortOrder?: number;
    createdAt?: string | null;
    legalValues?: LegalValueSchema[];
}
