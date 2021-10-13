import * as React from "react";

import { RootStackScreenProps, TYPES } from "../types";
import { StyleSheet, Text, View } from "react-native";

import { Container } from "../components/Container";
import { GameGrid } from "../components/GameGrid";

function ScoreView({
  title,
  score,
}: {
  title: String;
  score: Number;
}): JSX.Element {
  return (
    <View style={styles.scoreWrapper}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>{title}</Text>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
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
          <View style={styles.toolBar}></View>
        </View>
      </View>
      <View style={styles.gameContainer}>
        <GameGrid type={type as typeof TYPES[number]} />
      </View>
      <Text>
        HOW TO PLAY: Swipe with your fingers to move the tiles. Tiles with the
        same number merge into one when they touch. Add them up to reach 2048!
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
    fontSize: 100,
    fontWeight: "bold",
    color: "#776e65",
  },

  scoreBar: {
    flex: 2,
    flexDirection: "row",
  },
  scoreWrapper: {
    flex: 1,
  },
  scoreContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 10,
  },
  scoreTitle: {
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.3)",
  },
  scoreText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  toolBar: {
    flex: 1,
    flexDirection: "row",
  },

  gameContainer: {
    minHeight: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});
