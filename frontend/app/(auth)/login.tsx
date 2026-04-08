import { loginUserAPI } from "@/api/auth.api";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { setAuth, hydrate } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    if (!password) {
      alert("Password is required to login");
      return;
    }
    if (!email) {
      alert("Email is required to login");
      return;
    }
    try {
      const res = await loginUserAPI({ email, password });
      const { token, user } = res.data;
      setAuth(token, user);

      setEmail("");
      setPassword("");
    } catch (error: any) {
      const message = error.response?.data?.error ?? error.message;
      alert(message);
    } finally {
      setLoading(false);
      hydrate();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center w-full bg-neutral-100 p-6">
        <View className="px-6 py-8 bg-neutral-50 w-full rounded-lg shadow flex justify-start items-start gap-y-6">
          <View className="flex justify-start items-start gap-y-2 w-full">
            <View className="flex justify-between items-center w-full flex-row">
              <Text className="uppercase font-medium text-sm tracking-wide">
                Email
              </Text>
              <View /> {/* Left for proper alignment of text */}
            </View>
            <View className="flex justify-start items-start bg-neutral-100 w-full px-2 py-1 rounded-lg shadow">
              <TextInput
                placeholder="patient@track.medi"
                keyboardType="email-address"
                className="w-full"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View className="flex justify-start items-start gap-y-2 w-full">
            <View className="flex justify-between items-center w-full flex-row">
              <Text className="uppercase font-medium text-sm tracking-wide">
                Password
              </Text>
              <Text className="text-xs text-green-700 font-medium">
                Forgot Password?
              </Text>
            </View>
            <View className="flex justify-start items-start bg-neutral-100 w-full px-2 py-1 rounded-lg shadow">
              <TextInput
                keyboardType="visible-password"
                placeholder="**************"
                className="w-full"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View className="flex justify-center items-center w-full mt-10">
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="px-8 py-4 rounded-full bg-green-700 shadow w-full"
            >
              {loading ? (
                <ActivityIndicator className="text-center" />
              ) : (
                <Text className="text-neutral-100 text-center font-semibold text-lg">
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex justify-center items-center w-full flex-row gap-x-1 absolute bottom-14">
          <Text className="text-sm">Don't have an account?</Text>
          <Text className="font-medium text-sm text-green-700">Sign Up</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
