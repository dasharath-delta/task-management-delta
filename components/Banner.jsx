import React from 'react';

const Banner = () => {
  const statuses = ['🕓 Pending', '✅ Completed'];
  return (
    <div className="bg-cyan-100 border border-cyan-300 text-cyan-800 p-4 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-semibold text-center">
        {'📋 Task List Overview'}
      </h2>
      <p className="text-sm text-center mt-2">
        {
          'This section displays all your tasks along with their status, assigned project, and department. You can track task progress, view remarks, and filter by department or project as needed.'
        }
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {statuses.map((status, idx) => (
          <span
            key={idx}
            className="bg-cyan-200 px-3 py-1 rounded-full text-sm font-medium"
          >
            {status}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
