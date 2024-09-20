import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
        headerRight: ({ tintColor }) => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="sun-o"
                  size={25}
                  color={colorScheme === "dark" ? "white" : "black"}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notlarım",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="sticky-note" color={color} />
          ),
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 100,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          },
          headerLeftContainerStyle: {
            paddingVertical: 10,
          },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Listelerim",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 100,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          },
          headerLeftContainerStyle: {
            paddingVertical: 10,
          },
        }}
      />
    </Tabs>
  );
}
