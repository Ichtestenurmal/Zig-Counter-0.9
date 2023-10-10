import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getTrackers from '@wasp/queries/getTrackers';
import getDailyData from '@wasp/queries/getDailyData';

export function DashboardPage() {
  const { data: trackers, isLoading: isLoadingTrackers, error: errorTrackers } = useQuery(getTrackers);
  const { data: dailyData, isLoading: isLoadingDailyData, error: errorDailyData } = useQuery(getDailyData);

  if (isLoadingTrackers || isLoadingDailyData) return 'Loading...';
  if (errorTrackers || errorDailyData) return 'Error: ' + (errorTrackers || errorDailyData);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Trackers</h2>
      {trackers.map((tracker) => (
        <div key={tracker.id}>
          <p>Name: {tracker.name}</p>
          <p>Value: {tracker.value}</p>
        </div>
      ))}
      <h2>Daily Data</h2>
      {dailyData.map((data) => (
        <div key={data.id}>
          <p>Date: {data.date}</p>
          <p>Data: {JSON.stringify(data.data)}</p>
        </div>
      ))}
      <Link to="/tracker">Go to Tracker</Link>
      <Link to="/calendar">Go to Calendar</Link>
    </div>
  );
}