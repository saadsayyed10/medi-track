import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/hooks/useAuth";

const Scan = () => {
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const { hydrate } = useAuth();

  useEffect(() => {
    hydrate();
  }, []);

  const handleScan = async () => {
    // Request camera permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required to scan a prescription.");
      return;
    }

    setLoading(true);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });
    setLoading(false);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-full p-6">
      <View className="flex justify-start items-start flex-col gap-y-4 mb-44">
        <Text className="text-4xl font-bold text-neutral-800 capitalize">
          Upload Prescription
        </Text>
        <Text className="text-neutral-400 font-medium text-base">
          Position your medical prescription clearly within the frame. Our MedAI
          will extract dosage and timing automatically.
        </Text>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-48 rounded-2xl mt-2"
            resizeMode="cover"
          />
        )}
      </View>
      <TouchableOpacity
        onPress={handleScan}
        className="px-8 py-4 rounded-full bg-green-700 shadow w-full absolute bottom-10"
      >
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text className="text-neutral-100 text-center font-semibold text-lg">
            {imageUri ? "Retake" : "Scan Document"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Scan;
