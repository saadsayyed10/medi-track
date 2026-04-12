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
import { changePasswordAPI } from "@/api/user.api";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { hydrate, token } = useAuth();
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("Please do not leave any any fields empty");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirming password must be matched");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password length should be more than 8 character");
      return;
    }

    setLoading(true);
    try {
      await changePasswordAPI({ newPassword, oldPassword }, token!);
      alert("Password update successful.");

      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      router.push("/(app)/settings");
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message;
      setError(message);
    } finally {
      setLoading(false);

      hydrate();
    }
  };

  return (
    <View className="flex-1 justify-start items-center w-full flex-col gap-y-10 p-6">
      <View className="flex justify-start items-start flex-col gap-y-4 mt-28">
        <Text className="text-4xl font-bold text-neutral-800 capitalize">
          Security Update
        </Text>
        <Text className="text-neutral-400 font-medium text-base">
          Ensure your account stays protected by choosing a strong password.
        </Text>
      </View>
      <View className="flex justify-start items-start gap-y-6 w-full">
        <View className="flex justify-start items-start gap-y-2 w-full">
          <View className="flex justify-between items-center w-full flex-row">
            <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
              Current Password
            </Text>
            <View />
          </View>
          <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
            <TextInput
              keyboardType="visible-password"
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="***********************"
              className="w-full"
            />
          </View>
        </View>
        <View className="flex justify-start items-start gap-y-2 w-full">
          <View className="flex justify-between items-center w-full flex-row">
            <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
              New Password
            </Text>
            <View />
          </View>
          <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
            <TextInput
              keyboardType="visible-password"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="***********************"
              className="w-full"
            />
          </View>
        </View>
        <View className="flex justify-start items-start gap-y-2 w-full">
          <View className="flex justify-between items-center w-full flex-row">
            <Text className="uppercase font-medium text-sm tracking-wide text-neutral-800">
              Confirm new Password
            </Text>
            <View />
          </View>
          <View className="flex justify-start items-start bg-neutral-200 w-full px-2 py-1 rounded-lg shadow">
            <TextInput
              keyboardType="visible-password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder="***********************"
              className="w-full"
            />
          </View>
        </View>
        {error && (
          <Text className="text-sm font-semibold tracking-wide text-red-500 mt-2">
            {error}.
          </Text>
        )}
      </View>
      <View className="flex absolute bottom-10 justify-center items-center flex-col gap-y-4 w-full mb-10">
        <TouchableOpacity
          onPress={handleChangePassword}
          className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
        >
          {loading ? (
            <ActivityIndicator color={"white"} className="text-center" />
          ) : (
            <Text className="text-neutral-100 text-center font-semibold text-lg">
              Change Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
