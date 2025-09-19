import React from "react";

const Banner = ({
  title = "📋 Task List Overview",
  description = "This section displays all your tasks along with their status, assigned project, and department. You can track task progress, view remarks, and filter by department or project as needed.",
  statuses = ["🕓 Pending", "🚧 In Progress", "✅ Completed", "⏳ Not Started"],
}) => {
  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <p className="text-sm text-center mt-2">{description}</p>

      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {statuses.map((status, idx) => (
          <span
            key={idx}
            className="bg-blue-200 px-3 py-1 rounded-full text-sm font-medium"
          >
            {status}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
