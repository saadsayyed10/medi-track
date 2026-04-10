import axios from "axios";
import { agentURL } from "./apiUrl";
import { type SummarizeHealthIssue } from "@/types/ai-agent.types";

export const summarizeHealthIssueAPI = async (data: SummarizeHealthIssue) => {
  return axios.post(`${agentURL}/health-issues`, data);
};
