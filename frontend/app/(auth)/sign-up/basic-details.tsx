import { useSignUp } from "@/hooks/useSignUp";
import { useRouter } from "expo-router";
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

const BasicDetails = () => {
  const { name, setName, email, setEmail, age, setAge } = useSignUp();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleBasicDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/sign-up/ai-questions-health");
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-between flex-col items-center w-full p-6">
        <View className="flex justify-between items-center w-full flex-row mt-10">
          <View className="h-2 w-28 bg-green-700 rounded-full" />
          <View className="h-2 w-28 bg-neutral-300 rounded-full" />
          <View className="h-2 w-28 bg-neutral-300 rounded-full" />
        </View>
        <View className="flex justify-start items-start w-full flex-col gap-y-4">
          <Text className="text-neutral-400 font-bold uppercase tracking-wider text-sm">
            Registration
          </Text>
          <Text className="text-4xl font-bold text-neutral-800 capitalize">
            Create your health profile
          </Text>
          <Text className="text-neutral-400 font-medium text-base">
            Let's start with your basic details to personalize your clinical
            experience.
          </Text>
          <View className="flex justify-start items-start w-full flex-col gap-y-6 my-6">
            <View className="flex justify-start items-start gap-y-2 w-full">
              <View className="flex justify-between items-center w-full flex-row">
                <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
                  Full Name
                </Text>
                <View />
              </View>
              <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
                <TextInput
                  value={name!}
                  onChangeText={setName}
                  placeholder="Saad Sayyed"
                  className="w-full"
                />
              </View>
            </View>
            <View className="flex justify-start items-start gap-y-2 w-full">
              <View className="flex justify-between items-center w-full flex-row">
                <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
                  Email Address
                </Text>
                <View />
              </View>
              <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
                <TextInput
                  value={email!}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder="patient@meditrack.com"
                  className="w-full"
                />
              </View>
            </View>
            <View className="flex justify-start items-start gap-y-2 w-full">
              <View className="flex justify-between items-center w-full flex-row">
                <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
                  Age
                </Text>
                <View />
              </View>
              <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
                <TextInput
                  value={age!}
                  onChangeText={setAge}
                  placeholder="22"
                  className="w-full"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="flex justify-center items-center flex-col gap-y-4 w-full mb-10">
          <TouchableOpacity
            onPress={handleBasicDetails}
            className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
          >
            {loading ? (
              <ActivityIndicator className="text-center" />
            ) : (
              <Text className="text-neutral-100 text-center font-semibold text-lg">
                Continue
              </Text>
            )}
          </TouchableOpacity>
          <View className="flex justify-center items-center w-full flex-row gap-x-1">
            <Text className="text-sm">Already have an account?</Text>
            <Text
              onPress={() => {
                router.replace("/login");
              }}
              className="font-medium text-sm text-green-700"
            >
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BasicDetails;
