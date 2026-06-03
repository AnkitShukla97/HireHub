export type ApplicationStatus =
  | "idle"
  | "applied"
  | "interviewing"
  | "rejected"
  | { status: "offered"; salary: number };
