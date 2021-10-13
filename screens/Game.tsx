import * as React from "react";

import { RootStackScreenProps, TYPES } from "../types";
import { StyleSheet, Text, View } from "react-native";

import { Container } from "../components/Container";
import { FontAwesome } from "@expo/vector-icons";
import { GameGrid } from "../components/GameGrid";

function ScoreView({
  title,
  score,
}: {
  title: String;
  score: Number;
}): JSX.Element {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTitle}>{title}</Text>
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  );
}

export default function Game({
  navigation,
  route,
}: RootStackScreenProps<"Game">): JSX.Element {
  const { type } = route.params;
  return (
    <Container>
      <View style={styles.heading}>
        <View style={styles.headingItem}>
          <Text style={styles.headingText}>2048</Text>
        </View>
        <View style={styles.headingItem}>
          <View style={styles.scoreBar}>
            <ScoreView title="Score" score={0} />
            <ScoreView title="Best" score={0} />
          </View>
        </View>
      </View>
      <View style={styles.gameContainer}>
        <GameGrid type={type as typeof TYPES[number]} />
      </View>
      <Text style={styles.tips}>
        <Text style={styles.tipsBold}>HOW TO PLAY</Text>: Swipe with{" "}
        <Text style={styles.tipsBold}>your fingers</Text> to move the tiles.
        Tiles with the same number{" "}
        <Text style={styles.tipsBold}>merge into one</Text> when they touch. Add
        them up to reach <Text style={styles.tipsBold}>2048</Text>!
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  heading: {
    width: "100%",
    flexDirection: "row",
  },
  headingItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "#776e65",
  },

  scoreBar: {
    flexDirection: "row",
  },
  scoreContainer: {
    minWidth: 40,
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    backgroundColor: "#bbada0",
  },
  scoreTitle: {
    textTransform: "uppercase",
    color: "#eee4da",
  },
  scoreText: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  gameContainer: {
    minHeight: 400,
    alignItems: "center",
    justifyContent: "center",
  },

  tips: {
    fontSize: 20,
    color: "#776e65",
    lineHeight: 30,
  },
  tipsBold: {
    fontWeight: "bold",
  },
});
