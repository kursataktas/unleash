/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { ReleasePlanSchemaDiscriminator } from './releasePlanSchemaDiscriminator';
import type { ReleasePlanMilestoneSchema } from './releasePlanMilestoneSchema';

/**
 * Schema representing the creation of a release plan.
 */
export interface ReleasePlanSchema {
    /**
     * The ID of the currently active milestone in this release plan.
     * @nullable
     */
    activeMilestoneId?: string | null;
    /**
     * The date and time that the release template was created.
     */
    createdAt: string;
    /**
     * Release template: The ID of the user who created this template.
     */
    createdByUserId: number;
    /**
     * A description of the release template.
     * @nullable
     */
    description?: string | null;
    /**
     * A field to distinguish between release plans and release templates.
     */
    discriminator: ReleasePlanSchemaDiscriminator;
    /** The environment that this release plan is for. */
    environment: string;
    /** The name of the feature that uses this release plan. */
    featureName: string;
    /**
     * The release plan/template's ID. Release template IDs are ulids.
     */
    id: string;
    /** A list of the milestones in this release template. */
    milestones: ReleasePlanMilestoneSchema[];
    /** The name of the release template. */
    name: string;
    /**
     * The ID of the release plan template that this release plan is based on.
     */
    releasePlanTemplateId: string;
}
