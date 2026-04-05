// backend/src/types/user.type.ts

import { JwtPayload } from "jsonwebtoken";

// Used in backend/src/middleware/auth.middleware.ts
export interface GenerateTokenType extends JwtPayload {
  userId: string;
}

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
