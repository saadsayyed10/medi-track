import { useAuth } from "@/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

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
    <View className="flex-1 justify-center items-center w-full">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/login"}>
        <Text>Login</Text>
      </Link>
      {token && (
        <Text className="mt-10 text-xl" onPress={handleLogout}>
          Logout
        </Text>
      )}
    </View>
  );
}
