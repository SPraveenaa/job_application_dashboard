import type { Job } from "../types/job";

const STORAGE_KEY = "job_dashboard_jobs";

export const saveJobs = (jobs: Job[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};

export const loadJobs = (): Job[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
