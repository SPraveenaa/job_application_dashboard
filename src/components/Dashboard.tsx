import { useEffect, useState } from "react";
import type { Job } from "../types/job";
import { fetchJobs } from "../utils/api";
import JobCard from "./JobCard";
import Header from "./Header";
import AddJobModal from "./AddJobModal";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | Job["status"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from mock API
  useEffect(() => {
    fetchJobs().then((data) => {
      setJobs(data);
      setFilteredJobs(data);
      setLoading(false);
    });
  }, []);

  // Filter and search
  const applyFilter = (filter: "all" | Job["status"], jobsToFilter = jobs) => {
    let result =
      filter === "all"
        ? jobsToFilter
        : jobsToFilter.filter((job) => job.status === filter);

    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(result);
  };

  // Add or Edit job
  const handleAddOrEditJob = (job: Job) => {
    let updatedJobs: Job[];
    if (jobToEdit) {
      // Edit existing
      updatedJobs = jobs.map((j) => (j.id === job.id ? job : j));
      setJobToEdit(null);
    } else {
      // Add new
      updatedJobs = [...jobs, job];
    }
    setJobs(updatedJobs);
    applyFilter(activeFilter, updatedJobs);
    setIsModalOpen(false);
  };

  // Change status
  const handleStatusChange = (id: string, newStatus: Job["status"]) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
    applyFilter(activeFilter, updatedJobs);
  };

  // Delete job
  const handleDeleteJob = (id: string) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    applyFilter(activeFilter, updatedJobs);
  };

  // Open edit modal
  const handleEditJob = (job: Job) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  // Filter tab click
  const handleFilterClick = (filter: "all" | Job["status"]) => {
    setActiveFilter(filter);
    applyFilter(filter);
  };

  // Apply search whenever it changes
  useEffect(() => {
    applyFilter(activeFilter);
  }, [searchTerm]);

  return (
    <div className="p-6">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddJob={() => {
          setJobToEdit(null);
          setIsModalOpen(true);
        }}
      />

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "applied", "interview", "offer"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilterClick(status as "all" | Job["status"])}
            className={`px-4 py-2 rounded ${
              activeFilter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      {loading ? (
        <p className="text-center mt-4 text-gray-500">Loading jobs...</p>
      ) : filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteJob}
            onEdit={handleEditJob}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">No jobs available</p>
      )}

      {/* Add/Edit Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddOrEditJob}
        jobToEdit={jobToEdit}
      />
    </div>
  );
};

export default Dashboard;
