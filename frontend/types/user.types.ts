export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  name: string | null;
  email: string | null;
  password: string | null;
  age: string | null;
  allergies: string | null;
  allergiesKeywords: string[] | null;
  healthIssues: string | null;
  healthIssuesKeywords: string[] | null;
};
