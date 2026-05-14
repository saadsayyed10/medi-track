import { useAuth } from "@/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { hydrate, token } = useAuth();

  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <View className="flex-1 justify-start items-start w-full flex-col gap-y-10 px-6 py-20 bg-green-700">
      <View className="flex justify-between items-center w-full flex-row">
        <Text className="font-bold tracking-wide text-4xl text-neutral-100">
          MediTrack
        </Text>
        {!token ? (
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className="bg-neutral-100 px-6 rounded-full shadow-lg py-2"
          >
            <Text className="text-green-700 font-semibold text-lg">Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("/(app)/chat")}
            className="bg-neutral-100 px-6 rounded-full shadow-lg py-2"
          >
            <Text className="text-green-700 font-semibold text-lg">Scan</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="flex justify-start items-start w-full flex-col gap-y-10 mt-6">
        <Text className="text-neutral-100 font-bold text-4xl">
          Scan. Chat. Understand. Stay Safe.
        </Text>
        <Text className="text-neutral-100 font-medium text-lg mt-8">
          An AI-powered app designed to simplify the way patients understand and
          manage their medications. Users can upload images of doctor
          prescriptions or medicine labels, and the app instantly analyzes the
          information using AI. From dosage guidance and medicine usage to side
          effects and precautions, MediTrack helps patients get quick,
          easy-to-understand answers through an intelligent chatbot experience.
        </Text>
        <Text className="text-neutral-100 font-medium text-lg">
          Whether users want to revisit past conversations, track their
          medicines over time, or clarify doubts anytime, MediTrack provides a
          seamless and reliable healthcare assistance platform directly from
          their smartphone.
        </Text>
      </View>
      <View
        className={`flex justify-between items-center w-full absolute ${Platform.OS === "ios" ? "bottom-8" : "bottom-12"} flex-row ml-5`}
      >
        <Link
          href={"https://saadsayyed.vercel.app/"}
          className="text-neutral-100 font-medium text-xs"
        >
          Portfolio
        </Link>
        <Text className="text-neutral-100 font-medium text-sm">
          Saad Sayyed © 2026
        </Text>
        <Link
          href={"https://github.com/saadsayyed10"}
          className="text-neutral-100 font-medium text-xs"
        >
          GitHub
        </Link>
      </View>
    </View>
  );
}
