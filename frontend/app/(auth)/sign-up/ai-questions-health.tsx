import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ArrowRight } from "lucide-react-native";
import { useSignUp } from "@/hooks/useSignUp";
import { summarizeHealthIssueAPI } from "@/api/ai-agent.api";

const AIQuestionsHealth = () => {
  const { healthIssue, setHealthIssue, setHealthIssueKeywords, name } =
    useSignUp();
  const [healthIssueProblem, setHealthIssueProblem] = useState("");

  const [loading, setLoading] = useState(false);

  const [enableButton, setEnableButton] = useState(false);
  const [enableInput, setEnableInput] = useState(true);
  const [enableAIResponse, setEnableAIResponse] = useState(false);

  const router = useRouter();

  const handleHealthIssueAISummarize = async () => {
    if (!healthIssueProblem) {
      alert(
        "If you don't have any health issues, please specifically mention that you dont possess any.",
      );
      return;
    }

    setLoading(true);
    try {
      const res = await summarizeHealthIssueAPI({
        healthIssue: healthIssueProblem,
        name,
      });
      const { summarization, keywords } = res.data;
      setHealthIssue(summarization);
      setHealthIssueKeywords(keywords);

      setEnableAIResponse(true);
      setEnableInput(false);
      setEnableButton(true);
    } catch (error: any) {
      alert(error.response?.data?.error ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAIHealthQuestions = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/sign-up/ai-questions-allergy");
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Text className="text-neutral-200 font-semibold text-sm">
                {healthIssueProblem ? healthIssueProblem : "..."}
              </Text>
            </View>
          </View>
          {enableAIResponse && (
            <View className="flex justify-between items-end w-full">
              <View />
              <View className="w-64 h-min bg-neutral-200 shadow px-8 py-4 rounded-lg flex justify-start items-start">
                <Text className="text-neutral-800 font-semibold text-sm">
                  {healthIssue}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View className="flex justify-center items-center flex-col gap-y-4 w-full mb-10">
          {enableButton && (
            <TouchableOpacity
              onPress={handleAIHealthQuestions}
              className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
            >
              {loading ? (
                <ActivityIndicator className="text-center" />
              ) : (
                <Text className="text-neutral-100 text-center font-semibold text-lg">
                  Next
                </Text>
              )}
            </TouchableOpacity>
          )}

          {enableInput && (
            <View className="flex justify-start items-center w-full flex-row gap-x-2">
              <View className="flex justify-start items-start bg-neutral-200 px-2 py-1 rounded shadow w-[85%]">
                <TextInput
                  value={healthIssueProblem}
                  onChangeText={setHealthIssueProblem}
                  placeholder="Type your response here..."
                  className="w-full"
                />
              </View>
              <TouchableOpacity
                onPress={handleHealthIssueAISummarize}
                className="px-2 py-4 rounded shadow w-[15%] bg-green-700 flex justify-center items-center"
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <ArrowRight color={"white"} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AIQuestionsHealth;
