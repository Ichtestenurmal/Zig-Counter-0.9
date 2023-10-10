import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getDailyData from '@wasp/queries/getDailyData';

export function Calendar() {
  const { data: dailyData, isLoading, error } = useQuery(getDailyData);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {dailyData.map((data) => (
        <div key={data.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{data.date}</div>
          <div>{data.value}</div>
          <Link to={`/dailyData/${data.id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}