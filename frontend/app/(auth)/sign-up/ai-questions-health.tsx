import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { ArrowRight } from "lucide-react-native";

const AIQuestionsHealth = () => {
  const [loading, setLoading] = useState("");

  const [enableButton, setEnableButton] = useState(false);
  const [enableInput, setEnableInput] = useState(true);
  const [enableAIResponse, setEnableAIResponse] = useState(false);

  const router = useRouter();

  return (
    <View className="flex-1 justify-between flex-col items-center w-full p-6">
      <View className="flex justify-between items-center w-full flex-row mt-10">
        <Link href={"/(auth)/sign-up/basic-details"}>
          <View className="h-2 w-28 bg-neutral-300 rounded-full" />
        </Link>
        <View className="h-2 w-28 bg-green-700 rounded-full" />
        <View className="h-2 w-28 bg-neutral-300 rounded-full" />
      </View>
      <View className="flex justify-center items-center w-full flex-col gap-y-8">
        <View className="flex justify-between items-end w-full">
          <View />
          <View className="w-64 h-min bg-neutral-200 shadow px-8 py-4 rounded-lg flex justify-start items-start">
            <Text className="text-neutral-800 font-semibold text-sm">
              Hello! To ensure your safety, could you please list any known
              chronic health issues you may have?
            </Text>
          </View>
        </View>
        <View className="flex justify-between items-start w-full">
          <View />
          <View className="w-64 h-min bg-green-700 shadow px-8 py-4 rounded-lg flex justify-start items-start">
            <Text className="text-neutral-200 font-semibold text-sm">...</Text>
          </View>
        </View>
        {enableAIResponse && (
          <View className="flex justify-between items-end w-full">
            <View />
            <View className="w-64 h-min bg-neutral-200 shadow px-8 py-4 rounded-lg flex justify-start items-start">
              <Text className="text-neutral-800 font-semibold text-sm">
                Hello! To ensure your safety, could you please list any known
                chronic health issues you may have? Hello! To ensure your
                safety, could you please list any known chronic health issues
                you may have? Hello! To ensure your safety, could you please
                list any known chronic health issues you may have? Hello! To
                ensure your safety, could you please list any known chronic
                health issues you may have?
              </Text>
            </View>
          </View>
        )}
      </View>
      <View className="flex justify-center items-center flex-col gap-y-4 w-full mb-10">
        {enableButton && (
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-up/ai-questions-allergy")}
            className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
          >
            {loading ? (
              <ActivityIndicator className="text-center" />
            ) : (
              <Text className="text-neutral-100 text-center font-semibold text-lg">
                Summarize Health Issue
              </Text>
            )}
          </TouchableOpacity>
        )}

        {enableInput && (
          <View className="flex justify-start items-center w-full flex-row gap-x-2">
            <View className="flex justify-start items-start bg-neutral-200 px-2 py-1 rounded shadow w-[85%]">
              <TextInput
                placeholder="Type your response here..."
                className="w-full"
              />
            </View>
            <TouchableOpacity className="px-2 py-4 rounded shadow w-[15%] bg-green-700 flex justify-center items-center">
              <ArrowRight color={"white"} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default AIQuestionsHealth;
