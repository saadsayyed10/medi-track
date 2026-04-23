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

  const email = user?.email;
  const question = data.question;

  const res = await axios.post(`${ENV.AI_URL}/chat`, { email, question });
  const answer = res.data.answer[0].text;

  const chat = await prisma.chats.create({
    data: {
      patients_id: data.userId,
      question: question,
      answer: answer,
    },
  });

  return chat;
};
