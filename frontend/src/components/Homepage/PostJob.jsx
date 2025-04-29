import React, { useState } from 'react';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    description: '',
    working_hours: '',
    preferred_experience: '',
    wage: '',
    skills: '',
    qualification: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert skills and qualification strings to arrays
    const formattedData = {
      ...jobData,
      skills: jobData.skills.split(',').map(skill => skill.trim()),
      qualification: jobData.qualification.split(',').map(qual => qual.trim())
    };

    // Simulate API call
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setJobData({
          title: '',
          location: '',
          description: '',
          working_hours: '',
          preferred_experience: '',
          wage: '',
          skills: '',
          qualification: ''
        });
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">Your job has been posted successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., Senior React Developer"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., Remote, New York, etc."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Describe the job responsibilities and requirements..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Working Hours</label>
            <input
              type="text"
              name="working_hours"
              value={jobData.working_hours}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g., 40 hours/week"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Preferred Experience</label>
            <input
              type="text"
              name="preferred_experience"
              value={jobData.preferred_experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g., 3 years"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Wage</label>
          <input
            type="text"
            name="wage"
            value={jobData.wage}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., $50/hour"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={jobData.skills}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., React, Node.js, MongoDB"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Qualifications (comma-separated)</label>
          <input
            type="text"
            name="qualification"
            value={jobData.qualification}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., Bachelor's Degree, React Certification"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-full font-bold text-white transition-colors duration-300 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {isSubmitting ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default PostJob; 