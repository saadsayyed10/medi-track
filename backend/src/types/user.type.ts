// backend/src/types/user.type.ts

import { JwtPayload } from "jsonwebtoken";

// Used in backend/src/middleware/auth.middleware.ts
export interface DecodeTokenType extends JwtPayload {
  userId: string;
}

// Used in backend/src/api/services/user.service.ts
export type SignUpType = {
  name: string;
  email: string;
  password: string;
  age: string;
  allergies: string;
  allergiesKeywords: string[];
  healthIssues: string;
  healthIssuesKeywords: string[];
};

// Used in backend/src/api/services/user.service.ts
export type SignInType = {
  email: string;
  password: string;
};

// Used in backend/src/api/services/user.service.ts
export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
};

// Used in backend/src/api/services/user.service.ts
export type AllergyAndHealthUpdateType = {
  allergies: string[];
  healthIssues: string[];
};
