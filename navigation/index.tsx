import * as React from "react";

import Game from "../screens/Game";
import Home from "../screens/Home";
import LinkingConfiguration from "./LinkingConfiguration";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
