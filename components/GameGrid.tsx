import * as React from "react";

import { NUMBERS, SIZES } from "../types";
import { SemaphoreContext, useSemaphore } from "../hooks/useSemaphore";
import { StyleSheet, Text, View } from "react-native";
import { Tile, marginPresets, widthPresets } from "./Tile";

import { useGridControllerContext } from "../hooks/useGridController";
import { useSize } from "../hooks/useSizeContext";

export function GameGrid({
  disabled = false,
  randomNumber = 2,
}: {
  disabled?: Boolean;
  randomNumber?: number;
}): JSX.Element {
  const size = useSize();
  const semaphore = useSemaphore();
  const { getTiles } = useGridControllerContext();
  const rowStyles = [styles.gridRow, styles[`gridRow${size}`]];
  const colStyles = [styles.gridCol, styles[`gridCol${size}`]];

  const onMoveShouldSetResponder = () => true;
  const onResponderRelease = () => {
    console.log("onResponderRelease");
  };

  return (
    <SemaphoreContext.Provider value={semaphore}>
      <View
        style={[styles.gameWrapper, styles[`gameWrapper${size}`]]}
        onMoveShouldSetResponder={onMoveShouldSetResponder}
        onResponderRelease={onResponderRelease}
      >
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
    </SemaphoreContext.Provider>
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
