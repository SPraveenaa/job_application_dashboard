import React from "react";
import type { Job } from "../types/job";

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, newStatus: Job["status"]) => void;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onStatusChange, onDelete, onEdit }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-600">{job.company} - {job.location}</p>
        <p className="text-gray-500 text-sm">Status: {job.status}</p>
      </div>

      <div className="flex gap-2 mt-2 md:mt-0">
        <select
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value as Job["status"])}
          className="border border-gray-300 rounded p-1"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          onClick={() => onEdit(job)}
          className="px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(job.id)}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
