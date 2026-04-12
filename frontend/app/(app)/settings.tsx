import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

const Settings = () => {
  const { logout, hydrate } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await hydrate();
    router.push("/login");
  };

  return (
    <View className="flex-1 justify-center items-center w-full">
      <Text onPress={handleLogout}>Logout</Text>
    </View>
  );
};

export default Settings;
