import Webhook from './webhook';
import SlackAddon from './slack';
import TeamsAddon from './teams';
import DatadogAddon from './datadog';
import Addon from './addon';
import { LogProvider } from '../logger';
import SlackAppAddon from './slack-app';
import { IFeatureTagStore, IFlagResolver } from '../types';

export interface IAddonProviders {
    [key: string]: Addon;
}

export const getAddons: (args: {
    getLogger: LogProvider;
    unleashUrl: string;
    flagResolver: IFlagResolver;
    featureTagStore: IFeatureTagStore;
}) => IAddonProviders = ({
    getLogger,
    unleashUrl,
    flagResolver,
    featureTagStore,
}) => {
    const slackAppAddonEnabled = flagResolver.isEnabled('slackAppAddon');

    const slackAddon = new SlackAddon({
        getLogger,
        unleashUrl,
        featureTagStore,
    });

    if (slackAppAddonEnabled) {
        slackAddon.definition.deprecated =
            'This addon is deprecated. Please try the new Slack App integration instead.';
    }

    const addons: Addon[] = [
        new Webhook({ getLogger }),
        slackAddon,
        new TeamsAddon({ getLogger, unleashUrl }),
        new DatadogAddon({ getLogger, unleashUrl, featureTagStore }),
    ];

    if (slackAppAddonEnabled) {
        addons.push(
            new SlackAppAddon({ getLogger, unleashUrl, featureTagStore }),
        );
    }

    return addons.reduce((map, addon) => {
        // eslint-disable-next-line no-param-reassign
        map[addon.name] = addon;
        return map;
    }, {});
};
