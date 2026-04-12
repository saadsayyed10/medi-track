import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  BotMessageSquare,
  Settings,
  ScanText,
} from "lucide-react-native";

const AppLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#388E3C",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          paddingBottom: 8,
          paddingTop: 8,
          height: 110,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <LayoutDashboard
              size={size}
              color={color}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size, focused }) => (
            <ScanText
              size={size}
              color={color}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "AI",
          tabBarIcon: ({ color, size, focused }) => (
            <BotMessageSquare
              size={size}
              color={color}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Settings
              size={size}
              color={color}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
