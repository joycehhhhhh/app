import { Stack } from "expo-router";
import { View } from "react-native";

import { BottomNavigation } from "@/components/bottom-navigation";
import { RelationshipProvider } from "@/context/relationship-context";

export default function RootLayout() {
  return (
    <RelationshipProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#FBF7F1" }, headerBackTitle: "", headerBackButtonDisplayMode: "minimal" }} />
        <BottomNavigation />
      </View>
    </RelationshipProvider>
  );
}
