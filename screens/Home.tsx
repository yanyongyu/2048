import * as React from "react";

import { RootStackScreenProps, SIZES } from "../types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Container } from "../components/Container";
import { FontAwesome } from "@expo/vector-icons";
import { GameGrid } from "../components/GameGrid";
import { useSizeIndex } from "../hooks/useSizeContext";

export default function Home({
  navigation,
}: RootStackScreenProps<"Home">): JSX.Element {
  const { index, setIndex } = useSizeIndex();

  const previous = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index < SIZES.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <Container>
      <View>
        <Text style={styles.title}>2048</Text>
      </View>
      <View style={styles.gameContainer}>
        <GameGrid key="home" disabled={true} />
      </View>
      <View style={styles.slice}>
        <TouchableOpacity
          style={styles.sliceItem}
          activeOpacity={0.5}
          onPress={previous}
        >
          <FontAwesome name="chevron-left" style={styles.sliceText} />
        </TouchableOpacity>
        <View style={styles.sliceItem}>
          <Text style={styles.sliceText}>
            {SIZES[index]} x {SIZES[index]}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sliceItem}
          activeOpacity={0.5}
          onPress={next}
        >
          <FontAwesome name="chevron-right" style={styles.sliceText} />
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.5}
          onPress={() => navigation.push("Game")}
        >
          <Text style={styles.actionText}>开始游戏</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 100,
    fontWeight: "bold",
    color: "#776e65",
  },

  gameContainer: {
    minHeight: 400,
    alignItems: "center",
    justifyContent: "center",
  },

  slice: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  sliceItem: {
    flex: 1,
  },
  sliceText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  action: {
    width: "100%",
    marginTop: 30,
  },
  actionButton: {
    width: "100%",
    padding: 6,
    backgroundColor: "#f58461",
  },
  actionText: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
  },
});
