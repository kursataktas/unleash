/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * Unleash API
 * OpenAPI spec version: 4.22.0-beta.3
 */
import type { ProxyMetricsSchemaBucket } from './proxyMetricsSchemaBucket';

export interface ProxyMetricsSchema {
    appName: string;
    instanceId: string;
    environment?: string;
    bucket: ProxyMetricsSchemaBucket;
}
