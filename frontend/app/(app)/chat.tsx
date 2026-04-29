import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { fetchChatsPerPatientAPI } from "@/api/chat.api";

interface Chats {
  id: string;
  question: string;
  answer: string;
}

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const { token, hydrate } = useAuth();

  const [chat, setChat] = useState<Chats[]>([]);

  useEffect(() => {
    hydrate();
  }, []);

  const fetchAllChats = async () => {
    setLoading(true);
    try {
      const res = await fetchChatsPerPatientAPI(token!);
      setChat(res.data.chats);
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message;
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <>
      <ScrollView style={{ display: "flex", width: "100%", height: "100%" }}>
        <View className="flex justify-center items-center w-full p-6 mt-20 mb-20">
          {chat.map((ct) => (
            <View
              key={ct.id}
              className="flex justify-center items-center w-full flex-col gap-y-8"
            >
              <View className="flex justify-between items-start w-full">
                <View />
                <View className="w-64 h-min bg-green-700 shadow px-8 py-4 rounded-lg flex justify-start items-start">
                  <Text className="text-neutral-200 font-semibold text-sm">
                    {ct.question}
                  </Text>
                </View>
              </View>
              <View className="flex justify-between items-end w-full mb-8">
                <View />
                <View className="w-64 h-min bg-neutral-200 shadow px-8 py-4 rounded-lg flex justify-start items-start">
                  <Text className="text-neutral-800 font-semibold text-sm">
                    {ct?.answer}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex justify-center items-center w-full absolute bottom-0 flex-row gap-x-2 px-6 py-3 bg-white shadow-md">
        <View className="flex justify-start items-start bg-neutral-200 px-2 py-1 rounded shadow w-[85%]">
          <TextInput
            placeholder="Type your response here..."
            className="w-full"
          />
        </View>
        <TouchableOpacity className="px-2 py-4 rounded shadow w-[15%] bg-green-700 flex justify-center items-center">
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <ArrowRight color={"white"} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Chat;
