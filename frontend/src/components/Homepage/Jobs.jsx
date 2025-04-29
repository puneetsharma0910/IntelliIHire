import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from "./JobCard";
import Sidebar from "./Sidebar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState("available");

  // Sample job data with proper MongoDB ObjectIds
  const sampleJobs = [
    {
      _id: "65f1a2b3c4d5e6f7g8h9i0j1",
      title: "Senior React Developer",
      location: "Remote",
      description: "Looking for an experienced React developer to join our team. Must have 3+ years of experience with React, Redux, and modern JavaScript.",
      working_hours: "40 hours/week",
      preferred_experience: "3 years",
      wage: "$50/hour",
      skills: ["React", "Redux", "JavaScript", "HTML", "CSS"],
      qualification: ["Bachelor's in Computer Science", "React Certification"],
      assigned: false,
      proposals: 5,
      postedBy: { name: "TechCorp Inc." }
    },
    {
      _id: "65f1a2b3c4d5e6f7g8h9i0j2",
      title: "UI/UX Designer",
      location: "New York",
      description: "Seeking a creative UI/UX designer to create beautiful and intuitive user interfaces. Experience with Figma and Adobe XD required.",
      working_hours: "35 hours/week",
      preferred_experience: "2 years",
      wage: "$45/hour",
      skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Prototyping"],
      qualification: ["Design Degree", "Portfolio Required"],
      assigned: false,
      proposals: 3,
      postedBy: { name: "DesignHub" }
    },
    {
      _id: "65f1a2b3c4d5e6f7g8h9i0j3",
      title: "Full Stack Developer",
      location: "San Francisco",
      description: "Join our startup as a Full Stack Developer. Work on exciting projects using MERN stack and cloud technologies.",
      working_hours: "40 hours/week",
      preferred_experience: "4 years",
      wage: "$60/hour",
      skills: ["MongoDB", "Express", "React", "Node.js", "AWS"],
      qualification: ["Computer Science Degree", "Cloud Certification"],
      assigned: false,
      proposals: 8,
      postedBy: { name: "StartupX" }
    }
  ];

  useEffect(() => {
    // For now, use sample data
    setJobs(sampleJobs);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const toggleView = () => {
    setViewType(viewType === "available" ? "assigned" : "available");
  };

  const filteredJobs = jobs.filter(job => {
    if (viewType === "available") {
      return !job.assigned;
    } else {
      return job.assigned;
    }
  });

  return (
    <div className="flex justify-between items-start p-4 bg-gray-900 min-h-screen">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            {viewType === "available" ? "Available Jobs" : "Assigned Jobs"}
          </h2>
          <button 
            onClick={toggleView}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            {viewType === "available" ? "View Assigned Jobs" : "View Available Jobs"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
      <div className="hidden lg:block w-1/4">
        <Sidebar />
      </div>
    </div>
  );
};

export default Jobs;