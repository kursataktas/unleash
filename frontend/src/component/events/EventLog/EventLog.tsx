import { Switch, FormControlLabel, useMediaQuery } from '@mui/material';
import EventJson from 'component/events/EventJson/EventJson';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import EventCard from 'component/events/EventCard/EventCard';
import { useEventSettings } from 'hooks/useEventSettings';
import { useState, useEffect } from 'react';
import { Search } from 'component/common/Search/Search';
import theme from 'themes/theme';
import { useLegacyEventSearch } from 'hooks/api/getters/useEventSearch/useLegacyEventSearch';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useOnVisible } from 'hooks/useOnVisible';
import { styled } from '@mui/system';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useUiFlag } from 'hooks/useUiFlag';
import { EventLogFilters } from './EventLogFilters';
import type { EventSchema } from 'openapi';
import { useEventLogSearch } from './useEventLogSearch';

interface IEventLogProps {
    title: string;
    project?: string;
    feature?: string;
}

const StyledEventsList = styled('ul')(({ theme }) => ({
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: theme.spacing(2),
}));

const StyledFilters = styled(EventLogFilters)({
    padding: 0,
});

const EventResultWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 4, 4, 4),
    display: 'flex',
    flexFlow: 'column',
    gap: theme.spacing(1),
}));

const NewEventLog = ({ title, project, feature }: IEventLogProps) => {
    const {
        events,
        total,
        refetch: refetchEvents,
        loading,
        initialLoad,
        tableState,
        setTableState,
        filterState,
    } = useEventLogSearch(
        project
            ? { type: 'project', projectId: project }
            : feature
              ? { type: 'flag', flagName: feature }
              : { type: 'global' },
    );

    const setSearchValue = (query = '') => {
        setTableState({ query });
    };
    const { eventSettings, setEventSettings } = useEventSettings();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { isEnterprise } = useUiConfig();
    const showFilters = useUiFlag('newEventSearch') && isEnterprise();

    const onShowData = () => {
        setEventSettings((prev) => ({ showData: !prev.showData }));
    };

    const searchInputField = (
        <Search
            onChange={setSearchValue}
            initialValue={tableState.query || ''}
            debounceTime={500}
        />
    );

    const showDataSwitch = (
        <FormControlLabel
            label='Full events'
            control={
                <Switch
                    checked={eventSettings.showData}
                    onChange={onShowData}
                    color='primary'
                />
            }
        />
    );

    return (
        <PageContent
            bodyClass={'no-padding'}
            header={
                <PageHeader
                    title={`${title} (${total})`}
                    actions={
                        <>
                            {showDataSwitch}
                            {!isSmallScreen && searchInputField}
                        </>
                    }
                >
                    {isSmallScreen && searchInputField}
                </PageHeader>
            }
        >
            <EventResultWrapper>
                <StyledFilters
                    logType={project ? 'project' : feature ? 'flag' : 'global'}
                />
                <ConditionallyRender
                    condition={events.length === 0}
                    show={<p>No events found.</p>}
                />
                <ConditionallyRender
                    condition={events.length > 0}
                    show={
                        <StyledEventsList>
                            {events.map((entry) => (
                                <ConditionallyRender
                                    key={entry.id}
                                    condition={eventSettings.showData}
                                    show={() => <EventJson entry={entry} />}
                                    elseShow={() => <EventCard entry={entry} />}
                                />
                            ))}
                        </StyledEventsList>
                    }
                />
            </EventResultWrapper>
        </PageContent>
    );
};

export const EventLog = ({ title, project, feature }: IEventLogProps) => {
    const [query, setQuery] = useState('');
    const { events, totalEvents, fetchNextPage } = useLegacyEventSearch(
        project,
        feature,
        query,
    );
    const fetchNextPageRef = useOnVisible<HTMLDivElement>(fetchNextPage);
    const { eventSettings, setEventSettings } = useEventSettings();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { isEnterprise } = useUiConfig();
    const showFilters = useUiFlag('newEventSearch') && isEnterprise();

    // Cache the previous search results so that we can show those while
    // fetching new results for a new search query in the background.
    const [cache, setCache] = useState<EventSchema[]>();
    useEffect(() => events && setCache(events), [events]);

    const onShowData = () => {
        setEventSettings((prev) => ({ showData: !prev.showData }));
    };

    const searchInputField = <Search onChange={setQuery} debounceTime={500} />;

    const showDataSwitch = (
        <FormControlLabel
            label='Full events'
            control={
                <Switch
                    checked={eventSettings.showData}
                    onChange={onShowData}
                    color='primary'
                />
            }
        />
    );

    const count = events?.length || 0;
    const totalCount = totalEvents || 0;
    const countText = `${count} of ${totalCount}`;

    const EventResults = (
        <>
            <ConditionallyRender
                condition={Boolean(cache && cache.length === 0)}
                show={<p>No events found.</p>}
            />
            <ConditionallyRender
                condition={Boolean(cache && cache.length > 0)}
                show={
                    <StyledEventsList>
                        {cache?.map((entry) => (
                            <ConditionallyRender
                                key={entry.id}
                                condition={eventSettings.showData}
                                show={() => <EventJson entry={entry} />}
                                elseShow={() => <EventCard entry={entry} />}
                            />
                        ))}
                    </StyledEventsList>
                }
            />
        </>
    );

    return (
        <PageContent
            bodyClass={showFilters ? 'no-padding' : ''}
            header={
                <PageHeader
                    title={`${title} (${countText})`}
                    actions={
                        <>
                            {showDataSwitch}
                            {!isSmallScreen && searchInputField}
                        </>
                    }
                >
                    {isSmallScreen && searchInputField}
                </PageHeader>
            }
        >
            <ConditionallyRender
                condition={showFilters}
                show={
                    <EventResultWrapper>
                        <StyledFilters
                            logType={
                                project
                                    ? 'project'
                                    : feature
                                      ? 'flag'
                                      : 'global'
                            }
                        />
                        {EventResults}
                    </EventResultWrapper>
                }
                elseShow={EventResults}
            />

            <div ref={fetchNextPageRef} />
        </PageContent>
    );
};
