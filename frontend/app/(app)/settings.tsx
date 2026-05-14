import { deletePrescriptionsDataAPI } from "@/api/upload.api";
import { deleteAPI } from "@/api/user.api";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const { logout, hydrate, user, token } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await hydrate();
    router.push("/");
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAPI(token!);
      alert("Your account is now deleted permanently.");
      await logout();
      router.replace("/");
    } catch (error: any) {
      const message = error?.response?.data?.error ?? error?.message;
      alert(message);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  const handleResetData = async () => {
    setResetLoading(true);
    try {
      await deletePrescriptionsDataAPI(token!);
      alert("Your prescription data is now deleted permanently.");
    } catch (error: any) {
      const message = error?.response?.data?.error ?? error?.message;
      alert(message);
    } finally {
      setResetLoading(false);
      hydrate();
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-full flex-col gap-y-10 p-6">
      <View className="flex justify-center items-center flex-col gap-y-1 w-full">
        <Text className="font-bold text-4xl text-neutral-800 tracking-wide">
          {user?.name}
        </Text>
        <Text className="font-medium text-sm text-neutral-400">
          {user?.email}
        </Text>
      </View>
      <View className="flex justify-start items-start w-full flex-col gap-y-2">
        <Text className="font-bold text-xs uppercase text-neutral-400 tracking-wider">
          Account & Health
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(settings)/change-password")}
          className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200"
        >
          <Text className="font-medium text-base capitalize text-neutral-700 tracking-wider">
            Change Password
          </Text>
          <ChevronRight width={20} height={20} color={"lightgray"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await logout();
            router.replace("/(auth)/reset-password");
          }}
          className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200"
        >
          <Text className="font-medium text-base capitalize text-neutral-700 tracking-wider">
            Forgot Password
          </Text>
          <ChevronRight width={20} height={20} color={"lightgray"} />
        </TouchableOpacity>
      </View>
      <View className="flex justify-start items-start w-full flex-col gap-y-2">
        <Text className="font-bold text-xs uppercase text-red-500 tracking-wider">
          Danger Zone
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200"
        >
          <Text className="font-medium text-base capitalize text-red-600 tracking-wider">
            Logout
          </Text>
          <ChevronRight width={20} height={20} color={"red"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleResetData}
          className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200"
        >
          <Text className="font-medium text-base capitalize text-red-600 tracking-wider">
            {resetLoading ? (
              <ActivityIndicator className="text-center" color={"red"} />
            ) : (
              "Reset Data"
            )}
          </Text>
          <ChevronRight width={20} height={20} color={"red"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200"
        >
          <Text className="font-medium text-base capitalize text-red-600 tracking-wider">
            {loading ? (
              <ActivityIndicator color={"red"} className="text-center" />
            ) : (
              "Delete Account"
            )}
          </Text>
          <ChevronRight width={20} height={20} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
