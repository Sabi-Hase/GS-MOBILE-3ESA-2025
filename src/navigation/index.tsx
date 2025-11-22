import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddEntryScreen from "../screens/AddEntryScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "WorkWell" }} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} options={{ title: "Novo registro" }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: "Histórico" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
