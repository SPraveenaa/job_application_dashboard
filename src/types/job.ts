export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: "applied" | "interview" | "offer" | "rejected";
  createdAt: string;
}
