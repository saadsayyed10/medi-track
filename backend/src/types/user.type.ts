// backend/src/types/user.type.ts

// Used in backend/src/lib/token.ts
// export type GenerateTokenType = {
//   userId: string | null;
// };

// Used in backend/src/api/services/user.service.ts (sign-up)
export type SignUpType = {
  name: string;
  email: string;
  password: string;
  age: number;
  allergies: string[];
  healthIssues: string[];
};

// Used in backend/src/api/services/user.service.ts (sign-in)
export type SignInType = {
  email: string;
  password: string;
};
