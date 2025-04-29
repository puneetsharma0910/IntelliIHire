import React from 'react';
import Jobs from '../components/Homepage/Jobs';

const DeliverWork = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Deliver Work</h1>
        <Jobs />
      </div>
    </div>
  );
};

export default DeliverWork; 