import * as React from "react";

import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { Tile, marginPresets, widthPresets } from "./Tile";

import { SIZES } from "../types";
import { useGridControllerContext } from "../hooks/useGridController";
import { useSizeContext } from "../hooks/useSizeContext";

export function GameGrid({
  disabled = false,
}: {
  disabled?: Boolean;
}): JSX.Element {
  const { size } = useSizeContext();
  const { getTiles } = useGridControllerContext();
  const rowStyles = [styles.gridRow, styles[`gridRow${size}`]];
  const colStyles = [styles.gridCol, styles[`gridCol${size}`]];

  const onSwipeGesture = (
    event: HandlerStateChangeEvent<Record<string, unknown>>
  ) => {
    console.log(
      event.nativeEvent.state,
      event.nativeEvent.velocityX,
      event.nativeEvent.velocityY
    );
  };

  return (
    <PanGestureHandler
      enabled={!disabled}
      shouldCancelWhenOutside={true}
      onEnded={onSwipeGesture}
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
