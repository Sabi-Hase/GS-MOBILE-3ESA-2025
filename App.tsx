import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddEntryScreen from "./src/screens/AddEntryScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} options={{ title: "Registrar Humor" }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: "Histórico" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
