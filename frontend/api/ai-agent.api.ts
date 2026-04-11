import axios from "axios";
import { agentURL } from "./apiUrl";
import {
  type SummarizeAllergy,
  type SummarizeHealthIssue,
} from "@/types/ai-agent.types";

export const summarizeHealthIssueAPI = async (data: SummarizeHealthIssue) => {
  return axios.post(`${agentURL}/health-issues`, data);
};

export const summarizeAllergiesAPI = async (data: SummarizeAllergy) => {
  return axios.post(`${agentURL}/allergies`, data);
};
