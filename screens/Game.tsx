import * as React from "react";

import { RootStackScreenProps, TYPES } from "../types";
import { StyleSheet, Text, View } from "react-native";

import { Container } from "../components/Container";
import { GameGrid } from "../components/GameGrid";

export default function Game({
  navigation,
  route,
}: RootStackScreenProps<"Game">): JSX.Element {
  const { type } = route.params;
  return (
    <Container>
      <View>
        <Text>2048</Text>
      </View>
      <View>
        <GameGrid type={type as typeof TYPES[number]} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});
