/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * Unleash API
 * OpenAPI spec version: 4.22.0-beta.3
 */

/**
 * A definition of the project used for projects listing purposes
 */
export interface ProjectSchema {
    /** The id of this project */
    id: string;
    /** The name of this project */
    name: string;
    /** Additional information about the project */
    description?: string | null;
    /** An indicator of the [project's health](https://docs.getunleash.io/reference/technical-debt#health-rating) on a scale from 0 to 100 */
    health?: number;
    /** The number of features this project has */
    featureCount?: number;
    /** The number of members this project has */
    memberCount?: number;
    createdAt?: string;
    updatedAt?: string | null;
    /** `true` if the project was favorited, otherwise `false`. */
    favorite?: boolean;
}
