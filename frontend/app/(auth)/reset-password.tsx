import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { resetPasswordAPI } from "@/api/auth.api";
import { useRouter } from "expo-router";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { hydrate } = useAuth();
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      setError("Email is required to reset password");
      return;
    }
    setLoading(true);
    try {
      await resetPasswordAPI(email);

      setEmail("");
      alert("Please check new password sent to your email inbox or spam");

      router.replace("/(auth)/login");
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message;
      setError(message);
    } finally {
      await hydrate();
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-full flex-col gap-y-10 p-6">
      <View className="flex justify-start items-start flex-col gap-y-4">
        <Text className="text-4xl font-bold text-neutral-800 capitalize">
          Reset Password
        </Text>
        <Text className="text-neutral-400 font-medium text-base">
          If your account exists and you have forgotten your password, we will
          reset it and send the new password to your registered email address.
          You may update it at any time through your account settings.
        </Text>
      </View>
      <View className="flex justify-start items-start gap-y-2 w-full mb-32">
        <View className="flex justify-between items-center w-full flex-row">
          <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
            Email Address
          </Text>
          <View />
        </View>
        <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="patient@medi.track"
            className="w-full"
          />
        </View>
        {error && (
          <Text className="text-sm font-semibold tracking-wide text-red-500 mt-2">
            {error}
          </Text>
        )}
      </View>
      <View className="flex absolute bottom-10 justify-center items-center flex-col gap-y-4 w-full mb-10">
        <TouchableOpacity
          onPress={handleResetPassword}
          className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
        >
          {loading ? (
            <ActivityIndicator color={"white"} className="text-center" />
          ) : (
            <Text className="text-neutral-100 text-center font-semibold text-lg">
              Reset Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
