import { useState, useEffect } from "react";
import type { Job } from "../types/job";

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: Job) => void;
  jobToEdit?: Job | null;
}

const AddJobModal: React.FC<AddJobModalProps> = ({
  isOpen,
  onClose,
  onAddJob,
  jobToEdit = null,
}) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<Job["status"]>("applied");

  // Prefill form fields when editing
  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title);
      setCompany(jobToEdit.company);
      setLocation(jobToEdit.location);
      setStatus(jobToEdit.status);
    } else {
      setTitle("");
      setCompany("");
      setLocation("");
      setStatus("applied");
    }
  }, [jobToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company || !location) return;

    const job: Job = jobToEdit
      ? { ...jobToEdit, title, company, location, status }
      : {
          id: Date.now().toString(),
          title,
          company,
          location,
          status,
          createdAt: new Date().toISOString(),
        };

    onAddJob(job);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {jobToEdit ? "Edit Job" : "Add New Job"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Job["status"])}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              {jobToEdit ? "Save Changes" : "Add Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
