import { create } from "zustand";

interface SignUpState {
  name: string | null;
  email: string | null;
  age: string | null;
  healthIssue: string | null;
  healthIssueKeywords: string[] | null;
  allergy: string | null;
  allergyKeywords: string[] | null;
  password: string | null;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAge: (age: string) => void;
  setHealthIssue: (healthIssue: string) => void;
  setHealthIssueKeywords: (healthIssueKeywords: string[]) => void;
  setAllergy: (allergy: string) => void;
  setAllergyKeywords: (allergyKeywords: string[]) => void;
  setPassword: (password: string) => void;

  reset: () => void;
}

export const useSignUp = create<SignUpState>((set) => ({
  name: null,
  email: null,
  age: null,
  healthIssue: null,
  healthIssueKeywords: null,
  allergy: null,
  allergyKeywords: null,
  password: null,

  setName: (name) => {
    set({ name });
  },

  setEmail: (email) => {
    set({ email });
  },

  setAge: (age) => {
    set({ age });
  },

  setHealthIssue: (healthIssue) => {
    set({ healthIssue });
  },

  setHealthIssueKeywords: (healthIssueKeywords) => {
    set({ healthIssueKeywords });
  },

  setAllergy: (allergy) => {
    set({ allergy });
  },

  setAllergyKeywords: (allergyKeywords) => {
    set({ allergyKeywords });
  },

  setPassword: (password) => {
    set({ password });
  },

  reset: () => {
    set({
      name: null,
      email: null,
      age: null,
      healthIssue: null,
      healthIssueKeywords: null,
      allergy: null,
      allergyKeywords: null,
      password: null,
    });
  },
}));
