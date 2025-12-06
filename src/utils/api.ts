import type { Job } from "../types/job";

const MOCK_JOBS: Job[] = [
  { id: "1", title: "Frontend Developer", company: "ABC Corp", location: "Berlin", status: "applied", createdAt: new Date().toISOString() },
  { id: "2", title: "Backend Engineer", company: "XYZ Ltd", location: "Munich", status: "interview", createdAt: new Date().toISOString() },
  { id: "3", title: "Fullstack Developer", company: "Tech GmbH", location: "Hamburg", status: "offer", createdAt: new Date().toISOString() },
];

export const fetchJobs = (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_JOBS), 500);
  });
};
