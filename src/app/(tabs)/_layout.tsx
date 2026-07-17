import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="timeline"
        options={{
          title: "Timeline",
        }}
      />

      <Tabs.Screen
        name="add-memory"
        options={{
          title: "Add Memory",
        }}
      />

      <Tabs.Screen
        name="family"
        options={{
          title: "Family",
        }}
      />
    </Tabs>
  );
}
