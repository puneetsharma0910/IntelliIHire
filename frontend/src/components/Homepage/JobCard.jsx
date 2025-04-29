import React, { useState } from "react";
import axios from "axios";

const JobCard = ({ job }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const applyforJob = async () => {
    setIsApplying(true);
    setApplySuccess(false);
    
    // Simulate API call delay
    setTimeout(() => {
      setApplySuccess(true);
      setIsApplying(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setApplySuccess(false);
      }, 3000);
    }, 1000);
  };

  if (!job) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
            {job.location}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{job.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Working Hours:</h3>
            <p className="text-gray-600">{job.working_hours}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Experience:</h3>
            <p className="text-gray-600">{job.preferred_experience}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Wage:</h3>
          <p className="text-gray-600">{job.wage}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Skills:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Qualifications:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {job.qualification.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Proposals: {job.proposals || 0}</span>
          <span className="text-sm text-gray-500">Posted By: {job.postedBy?.name || 'Company'}</span>
        </div>

        {applySuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">Your job application has been sent successfully.</span>
          </div>
        )}

        <button
          onClick={applyforJob}
          disabled={isApplying || applySuccess}
          className={`w-full py-2 px-4 rounded-full font-bold text-white transition-colors duration-300 ${
            isApplying 
              ? 'bg-gray-400 cursor-not-allowed' 
              : applySuccess
                ? 'bg-green-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isApplying ? 'Applying...' : applySuccess ? 'Applied' : 'Apply'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
