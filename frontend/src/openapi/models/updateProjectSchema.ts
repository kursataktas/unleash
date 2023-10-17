/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { UpdateProjectSchemaMode } from './updateProjectSchemaMode';

/**
 * Data used to update a [project](https://docs.getunleash.io/reference/projects)
 */
export interface UpdateProjectSchema {
    /** The new name of the project */
    name: string;
    /** A new description for the project */
    description?: string;
    /** A mode of the project affecting what actions are possible in this project */
    mode?: UpdateProjectSchemaMode;
    /** A default stickiness for the project affecting the default stickiness value for variants and Gradual Rollout strategy */
    defaultStickiness?: string;
}
