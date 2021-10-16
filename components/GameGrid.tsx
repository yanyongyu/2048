import * as React from "react";

import {
  Direction,
  useGridControllerContext,
} from "../hooks/useGridController";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { Tile, marginPresets, widthPresets } from "./Tile";

import { SIZES } from "../types";
import { useSizeContext } from "../hooks/useSizeContext";

export function GameGrid({
  disabled = false,
}: {
  disabled?: Boolean;
}): JSX.Element {
  const { size } = useSizeContext();
  const { getTiles, saveState, move } = useGridControllerContext();
  const rowStyles = [styles.gridRow, styles[`gridRow${size}`]];
  const colStyles = [styles.gridCol, styles[`gridCol${size}`]];

  const onSwipeGesture = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state !== State.END) return;
    const {
      nativeEvent: { velocityX: dx, velocityY: dy },
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
      saveState();
    }
  };

  return (
    <PanGestureHandler
      enabled={!disabled}
      shouldCancelWhenOutside={true}
      onHandlerStateChange={onSwipeGesture}
    >
      <View style={[styles.gameWrapper, styles[`gameWrapper${size}`]]}>
        {[...Array(size)].map((_, row) => (
          <View
            key={`row-${row}`}
            style={
              row === size - 1
                ? [...rowStyles, styles.gridRowNoBottom]
                : rowStyles
            }
          >
            {[...Array(size)].map((_, col) => (
              <View
                key={`col-${col}`}
                style={
                  col === size - 1
                    ? [...colStyles, styles.gridColNoRight]
                    : colStyles
                }
              ></View>
            ))}
          </View>
        ))}
        <View style={styles.tileContainer}>
          {getTiles().map((tile, index) => (
            <Tile key={`tile-${index}`} {...tile} />
          ))}
        </View>
      </View>
    </PanGestureHandler>
  );
}

const stylesheet: StyleSheet.NamedStyles<{ [key: string]: any }> = {
  gameWrapper: {
    position: "relative",
    borderRadius: 6,
    backgroundColor: "#bbada0",
  },

  gridRow: {
    flexDirection: "row",
  },
  gridRowNoBottom: {
    marginBottom: 0,
  },
  gridCol: {
    margin: 0,
    padding: 0,
    borderRadius: 3,
    backgroundColor: "rgba(238, 228, 218, 0.35)",
  },
  gridColNoRight: {
    marginRight: 0,
  },

  tileContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
};

for (const type of SIZES) {
  stylesheet[`gameWrapper${type}`] = { padding: marginPresets[type] };
  stylesheet[`gridRow${type}`] = {
    height: widthPresets[type],
    marginBottom: marginPresets[type],
  };
  stylesheet[`gridCol${type}`] = {
    width: widthPresets[type],
    marginRight: marginPresets[type],
  };
}

const styles = StyleSheet.create(stylesheet);
