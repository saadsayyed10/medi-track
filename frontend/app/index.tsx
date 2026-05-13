import { useAuth } from "@/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { logout, hydrate, token } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await hydrate();
    router.push("/login");
  };

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <View className="flex-1 justify-start items-start w-full flex-col gap-y-10 px-6 py-20 bg-green-700">
      <View className="flex justify-between items-center w-full flex-row">
        <Text className="font-bold tracking-wide text-4xl text-neutral-100">
          MediTrack
        </Text>
        <TouchableOpacity className="bg-neutral-100 px-6 rounded-full shadow-lg py-2">
          <Text className="text-green-700 font-semibold text-lg">Login</Text>
        </TouchableOpacity>
      </View>
      <View className="flex justify-start items-start w-full flex-col gap-y-8 mt-10">
        <Text className="text-neutral-100 font-bold text-4xl">
          Welcome to the app that guides you.
        </Text>
        <Text className="text-neutral-100 font-medium text-lg">
          Welcome to my beloved app, Meditrack.
        </Text>
      </View>
    </View>
  );
}
