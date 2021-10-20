import * as React from "react";

import {
  Direction,
  Tile,
  useGridControllerContext,
} from "../hooks/useGridController";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { Grid } from "./Grid";
import { View, StyleSheet, Text } from "react-native";
import { useScoreControllerContext } from "../hooks/useScoreController";
import { useNavigation } from "@react-navigation/core";

export function GameGrid({
  disabled = false,
}: {
  disabled?: Boolean;
}): JSX.Element {
  const navigation = useNavigation();
  const { over } = useScoreControllerContext();
  const { getTiles, move, reset, addRandomTile, saveState } =
    useGridControllerContext();

  const onSwipeGesture = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state !== State.END) return;
    const {
      nativeEvent: { translationX: dx, translationY: dy },
    } = event;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) > 10) {
      move(
        absDx > absDy
          ? dx > 0
            ? Direction.right
            : Direction.left
          : dy > 0
          ? Direction.down
          : Direction.up
      );
    }
  };

  return (
    <PanGestureHandler
      enabled={!disabled}
      shouldCancelWhenOutside={true}
      onHandlerStateChange={onSwipeGesture}
    >
      <View style={styles.messageWrapper}>
        <Grid tiles={getTiles()} />
        {over && (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>Game Over!</Text>
            <View style={styles.action}>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.5}
                onPress={() => {
                  reset();
                  [...Array(2)].forEach(addRandomTile);
                  saveState();
                }}
              >
                <Text style={styles.actionText}>Try again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.actionText}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    position: "relative",
  },
  messageContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(238, 228, 218, 0.73)",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#776e65",
  },
  action: {
    marginTop: 30,
  },
  actionButton: {
    margin: 5,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#8f7a66",
  },
  actionText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 42,
    color: "#ffffff",
    textAlign: "center",
  },
});
