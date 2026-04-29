// backend/src/api/services/chat.service.ts

// Import types
import { type ChatWithMedAI } from "../../types/chat.type";

// Import ORM instance
import prisma from "../../lib/prisma.orm";

// Import helper configs, libs and functions
import axios from "axios";
import { ENV } from "../../config/env.config";

export const chatWithMedAIService = async (data: ChatWithMedAI) => {
  const user = await prisma.patients.findUnique({
    where: {
      id: data.userId,
    },
  });

  const question = data.question;

  const res = await axios.post(`${ENV.AI_URL}/chat`, {
    email: user?.email,
    question,
  });
  const answer = res.data.answer;

  const chat = await prisma.chats.create({
    data: {
      patients_id: data.userId,
      question: question,
      answer: answer,
    },
  });

  return chat;
};

export const fetchAllChatsForPatientService = async (patientId: string) => {
  return await prisma.chats.findMany({
    where: {
      patients_id: patientId,
    },
  });
};
