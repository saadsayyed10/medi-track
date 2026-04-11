import { registerUserAPI } from "@/api/auth.api";
import { useAuth } from "@/hooks/useAuth";
import { useSignUp } from "@/hooks/useSignUp";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";

const SetPassword = () => {
  const {
    name,
    email,
    password,
    setPassword,
    age,
    allergy,
    allergyKeywords,
    healthIssue,
    healthIssueKeywords,
    reset,
  } = useSignUp();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { setAuth, hydrate } = useAuth();

  const router = useRouter();

  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      alert("Password or confirm password is required to sign up");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm password should be matched");
      return;
    }

    if (password.length < 8) {
      alert("Password should contain more than 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUserAPI({
        name,
        email,
        password: password.trim(),
        age,
        allergies: allergy,
        allergiesKeywords: allergyKeywords,
        healthIssues: healthIssue,
        healthIssuesKeywords: healthIssueKeywords,
      });

      const { token, user } = res.data;
      await setAuth(token, user);
      reset();

      router.replace("/");
    } catch (error: any) {
      alert(error.response?.data?.error ?? error.message);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  return (
    <View className="flex-1 justify-between flex-col items-center w-full p-6">
      <View className="flex justify-between items-center w-full flex-row mt-10">
        <Link href={"/(auth)/sign-up/basic-details"}>
          <View className="h-2 w-28 bg-neutral-300 rounded-full" />
        </Link>
        <Link href={"/(auth)/sign-up/ai-questions-health"}>
          <View className="h-2 w-28 bg-neutral-300 rounded-full" />
        </Link>
        <View className="h-2 w-28 bg-green-700 rounded-full" />
      </View>
      <View className="flex justify-start items-start w-full flex-col gap-y-4">
        <Text className="text-neutral-400 font-bold uppercase tracking-wider text-sm">
          Set Password
        </Text>
        <Text className="text-4xl font-bold text-neutral-800 capitalize">
          Protect your health data
        </Text>
        <Text className="text-neutral-400 font-medium text-base">
          Create a strong password to ensure your clinical records and personal
          insights remain private and secure.
        </Text>
        <View className="flex justify-start items-start w-full flex-col gap-y-6 my-6">
          <View className="flex justify-start items-start gap-y-2 w-full">
            <View className="flex justify-between items-center w-full flex-row">
              <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
                Password
              </Text>
              <View />
            </View>
            <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
              <TextInput
                value={password!}
                onChangeText={setPassword}
                placeholder="******************"
                className="w-full"
              />
            </View>
          </View>
          <View className="flex justify-start items-start gap-y-2 w-full">
            <View className="flex justify-between items-center w-full flex-row">
              <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
                Confirm Password
              </Text>
              <View />
            </View>
            <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="******************"
                className="w-full"
              />
            </View>
          </View>
        </View>
      </View>
      <View className="flex justify-center items-center flex-col gap-y-4 w-full mb-10">
        <TouchableOpacity
          onPress={handleRegister}
          className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
        >
          {loading ? (
            <ActivityIndicator color={"white"} className="text-center" />
          ) : (
            <Text className="text-neutral-100 text-center font-semibold text-lg">
              Create Account
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetPassword;
