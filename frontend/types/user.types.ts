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

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type FetchUser = {
  id: string;
  name: string;
  email: string;
  age: string;
  allergies: string;
  allergiesKeyword: string[];
  healthIssues: string;
  healthIssuesKeywords: string[];
};
