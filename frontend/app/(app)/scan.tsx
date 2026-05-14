import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchPrescriptionDataAPI,
  uploadPrescriptionAPI,
} from "@/api/upload.api";
import { useScan } from "@/hooks/useScan";
import Markdown from "react-native-markdown-display";
import { useRouter } from "expo-router";

const Scan = () => {
  const [loading, setLoading] = useState(false);
  const { uploadImage, setUploadImage } = useScan();
  const [lines, setLines] = useState<string[]>([]);

  const [prescription, setPrescription] = useState<string>("");

  const [hideContent, setHideContent] = useState(true);

  const { hydrate, token } = useAuth();

  const router = useRouter();

  useEffect(() => {
    hydrate();
    handleFetchPrescription();
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

  const handleFetchPrescription = async () => {
    setLoading(true);
    try {
      const res = await fetchPrescriptionDataAPI(token!);
      setPrescription(res.data.prescription);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  // if (prescription.length !== 0) {
  //   return loading ? (
  //     <View className="flex-1 justify-center items-center w-full">
  //       <ActivityIndicator color={"darkgreen"} size={"large"} />
  //     </View>
  //   ) : (
  //     <View className="flex-1 justify-between items-center w-full px-6 py-16 flex-col gap-y-6">
  //       <View />
  //       <Text className="text-center text-lg text-neutral-600">
  //         You have already uploaded the prescription image, please chat to MedAI
  //         or delete existing one from the settings then upload a new one.
  //       </Text>
  //       <TouchableOpacity
  //         onPress={() => router.replace("/(app)/chat")}
  //         className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
  //       >
  //         <Text className="text-neutral-100 text-center font-semibold text-lg">
  //           Chat to MedAI
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

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
        <ScrollView style={{ display: "flex", width: "100%", height: "100%" }}>
          {loading ? (
            <View className="flex-1 justify-center items-center w-full">
              <ActivityIndicator
                color={"darkgreen"}
                size={"large"}
                className="text-center"
              />
            </View>
          ) : (
            <View className="flex-1 flex-col gap-y-4 justify-start items-start w-full mt-20">
              <Text className="text-4xl font-bold text-neutral-800 capitalize">
                Prescription Summary
              </Text>
              <Markdown
                style={{
                  body: { color: "#262626", fontSize: 14 },
                }}
              >
                {lines.join("\n")}
              </Markdown>
              <TouchableOpacity
                onPress={() => setHideContent(true)}
                className="px-8 py-4 rounded-full bg-green-700 shadow w-full mt-10"
              >
                <Text className="text-neutral-100 text-center font-semibold text-lg">
                  Okay
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Scan;
