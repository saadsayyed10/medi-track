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
import { uploadPrescriptionAPI } from "@/api/upload.api";
import { useRouter } from "expo-router";
import { useScan } from "@/hooks/useScan";

const Scan = () => {
  const [loading, setLoading] = useState(false);
  const { uploadImage, setUploadImage } = useScan();
  const [lines, setLines] = useState<string[]>([]);

  const [hideContent, setHideContent] = useState(true);

  const { hydrate, token } = useAuth();

  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, []);

  const handleUploadPrescription = async (imageUri: string) => {
    setLoading(true);
    try {
      const res = await uploadPrescriptionAPI(imageUri, token!);
      setLines(res.data.prescription.content);
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message;
      alert(message);
      console.log(error);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  const handleScan = async () => {
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
      const uri = result.assets[0].uri;
      setUploadImage(uri); // still store in state
      setHideContent(false);
      await handleUploadPrescription(uri); // pass directly
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-full p-6">
      {hideContent && (
        <View className="flex justify-start items-start flex-col gap-y-4 mb-44">
          <Text className="text-4xl font-bold text-neutral-800 capitalize">
            Upload Prescription
          </Text>
          <Text className="text-neutral-400 font-medium text-base">
            Position your medical prescription clearly within the frame. Our
            MedAI will extract dosage and timing automatically.
          </Text>
          {uploadImage && (
            <Image
              source={{ uri: uploadImage }}
              className="w-full h-48 rounded-2xl mt-2"
              resizeMode="cover"
            />
          )}
        </View>
      )}
      {hideContent && (
        <TouchableOpacity
          onPress={handleScan}
          className="px-8 py-4 rounded-full bg-green-700 shadow w-full absolute bottom-6"
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text className="text-neutral-100 text-center font-semibold text-lg">
              Scan
            </Text>
          )}
        </TouchableOpacity>
      )}
      {!hideContent && (
        <View className="flex justify-start items-start">
          {lines.map((line, i) => (
            <Text key={i} className="text-neutral-800 text-sm mb-1">
              {line}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default Scan;
