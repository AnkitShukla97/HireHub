export interface Company {
  name: string;
  logo: string;
}

export interface Salary {
  min: number;
  max: number;
  currency: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  salary: Salary;
  tags: string[];
  postedAt: string;
}
