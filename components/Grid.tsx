import * as React from "react";

import { StyleSheet, View } from "react-native";
import { Tile, marginPresets, widthPresets } from "./Tile";

import { SIZES } from "../types";
import { Tile as TileProps } from "../hooks/useGridController";
import { useSizeContext } from "../hooks/useSizeContext";

export function Grid({ tiles }: { tiles?: TileProps[] }): JSX.Element {
  const { size } = useSizeContext();
  const rowStyles = [styles.gridRow, styles[`gridRow${size}`]];
  const colStyles = [styles.gridCol, styles[`gridCol${size}`]];

  return (
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
        {tiles &&
          tiles.map((tile, index) => <Tile key={`tile-${index}`} {...tile} />)}
      </View>
    </View>
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

for (const size of SIZES) {
  stylesheet[`gameWrapper${size}`] = { padding: marginPresets[size] };
  stylesheet[`gridRow${size}`] = {
    height: widthPresets[size],
    marginBottom: marginPresets[size],
  };
  stylesheet[`gridCol${size}`] = {
    width: widthPresets[size],
    marginRight: marginPresets[size],
  };
}

const styles = StyleSheet.create(stylesheet);
