export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  age: string;
  allergies: string;
  allergiesKeywords: string[];
  healthIssues: string;
  healthIssuesKeywords: string[];
};
