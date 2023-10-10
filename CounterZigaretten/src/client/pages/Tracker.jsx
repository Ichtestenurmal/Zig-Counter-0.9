import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTrackers from '@wasp/queries/getTrackers';
import incrementTracker from '@wasp/actions/incrementTracker';
import decrementTracker from '@wasp/actions/decrementTracker';

export function Tracker() {
  const { data: trackers, isLoading, error } = useQuery(getTrackers);
  const incrementTrackerFn = useAction(incrementTracker);
  const decrementTrackerFn = useAction(decrementTracker);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleIncrementTracker = (trackerId) => {
    incrementTrackerFn({ trackerId });
  };

  const handleDecrementTracker = (trackerId) => {
    decrementTrackerFn({ trackerId });
  };

  return (
    <div className='p-4'>
      {trackers.map((tracker) => (
        <div
          key={tracker.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{tracker.name}</div>
          <div>{tracker.value}</div>
          <div>
            <button
              onClick={() => handleIncrementTracker(tracker.id)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              +
            </button>
            <button
              onClick={() => handleDecrementTracker(tracker.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}