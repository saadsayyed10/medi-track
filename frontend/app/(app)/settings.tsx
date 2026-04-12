import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

const Settings = () => {
  const { logout, hydrate } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await hydrate();
    router.push("/login");
  };

  return (
    <View className="flex-1 justify-center items-center w-full flex-col gap-y-10 p-6">
      <View className="flex justify-center items-center flex-col gap-y-1 w-full">
        <Text className="font-bold text-4xl text-neutral-800 tracking-wide">
          Saad Sayyed
        </Text>
        <Text className="font-medium text-sm text-neutral-400">
          saadsyed950@gmail.com
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
        <TouchableOpacity className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200">
          <Text className="font-medium text-base capitalize text-neutral-700 tracking-wider">
            Update Profile
          </Text>
          <ChevronRight width={20} height={20} color={"lightgray"} />
        </TouchableOpacity>
      </View>
      <View className="flex justify-start items-start w-full flex-col gap-y-2">
        <Text className="font-bold text-xs uppercase text-red-500 tracking-wider">
          Danger Zone
        </Text>
        <TouchableOpacity className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200">
          <Text className="font-medium text-base capitalize text-red-600 tracking-wider">
            Delete Account
          </Text>
          <ChevronRight width={20} height={20} color={"red"} />
        </TouchableOpacity>
        <TouchableOpacity className="flex justify-between items-start w-full px-3 py-5 shadow rounded-md bg-white flex-row mt-1 border border-neutral-200">
          <Text className="font-medium text-base capitalize text-red-600 tracking-wider">
            Logout
          </Text>
          <ChevronRight width={20} height={20} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
