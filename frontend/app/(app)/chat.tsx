import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { chatWithMedAIAPI, fetchChatsPerPatientAPI } from "@/api/chat.api";
import { fetchPrescriptionDataAPI } from "@/api/upload.api";
import { useRouter } from "expo-router";

interface Chats {
  id: string;
  question: string;
  answer: string;
}

const Chat = () => {
  const { token, hydrate } = useAuth();

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAILoading] = useState(false);

  const [chat, setChat] = useState<Chats[]>([]);
  const [question, setQuestion] = useState("");

  const [prescription, setPrescription] = useState<string>("");

  const router = useRouter();

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

  const handleChat = async () => {
    if (!question) {
      alert("Please enter question");
      return;
    }
    setAILoading(true);
    try {
      await chatWithMedAIAPI(question, token!);

      setQuestion("");
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message;
      alert(message);
    } finally {
      setAILoading(false);
      fetchAllChats();
    }
  };

  const handleFetchPrescription = async () => {
    setLoading(true);
    try {
      const res = await fetchPrescriptionDataAPI(token!);
      setPrescription(res.data.prescription);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPrescription();
    fetchAllChats();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center w-full">
        <ActivityIndicator color={"darkgreen"} size={"large"} />
      </View>
    );
  }

  if (prescription.length === 0) {
    return loading ? (
      <View className="flex-1 justify-center items-center w-full">
        <ActivityIndicator color={"darkgreen"} size={"large"} />
      </View>
    ) : (
      <View className="flex-1 justify-between items-center w-full px-6 py-16 flex-col gap-y-6">
        <View />
        <Text className="text-center text-lg text-neutral-600">
          You have to upload an image of the prescription in order to chat with
          MedAI.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(app)/scan")}
          className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
        >
          <Text className="text-neutral-100 text-center font-semibold text-lg">
            Upload Prescription
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
      {prescription.length !== 0 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex justify-center items-center w-full absolute bottom-0 flex-row gap-x-2 px-6 py-3 bg-white shadow-md"
        >
          <View className="flex justify-start items-start bg-neutral-200 px-2 py-1 rounded shadow w-[85%]">
            <TextInput
              value={question}
              onChangeText={setQuestion}
              placeholder="Type your response here..."
              className={`${Platform.OS === "ios" ? "h-10 w-full" : "w-full"}`}
            />
          </View>
          <TouchableOpacity
            onPress={handleChat}
            className="px-2 py-4 rounded shadow w-[15%] bg-green-700 flex justify-center items-center"
          >
            {aiLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <ArrowRight color={"white"} />
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Chat;
