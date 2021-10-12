import * as React from "react";

import { StyleSheet, View } from "react-native";

import { TYPES } from "../types";

export function GameGrid({
  type = 4,
}: {
  type?: typeof TYPES[number];
}): JSX.Element {
  const rowStyles = [styles.gridRow, styles[`gridRow${type}`]];
  const colStyles = [styles.gridCol, styles[`gridCol${type}`]];

  return (
    <View style={[styles.gameWrapper, styles[`gameWrapper${type}`]]}>
      {[...Array(type)].map((_, row) => (
        <View
          key={`row-${row}`}
          style={
            row === type - 1
              ? [...rowStyles, styles.gridRowNoBottom]
              : rowStyles
          }
        >
          {[...Array(type)].map((_, col) => (
            <View
              key={`col-${col}`}
              style={
                col === type - 1
                  ? [...colStyles, styles.gridColNoRight]
                  : colStyles
              }
            ></View>
          ))}
        </View>
      ))}
    </View>
  );
}

const widthPresets = {
  3: 100,
  4: 75,
  5: 60,
  6: 50,
  8: 37,
};
const marginPresets = {
  3: 9,
  4: 7,
  5: 6,
  6: 5,
  8: 4,
};

const styles = StyleSheet.create({
  gameWrapper: {
    position: "relative",
    borderRadius: 6,
    backgroundColor: "#bbada0",
  },
  gameWrapper3: {
    padding: marginPresets[3],
  },
  gameWrapper4: {
    padding: marginPresets[4],
  },
  gameWrapper5: {
    padding: marginPresets[5],
  },
  gameWrapper6: {
    padding: marginPresets[6],
  },
  gameWrapper8: {
    padding: marginPresets[8],
  },

  gridRow: {
    flexDirection: "row",
  },
  gridRowNoBottom: {
    marginBottom: 0,
  },
  gridRow3: {
    height: widthPresets[3],
    marginBottom: marginPresets[3],
  },
  gridRow4: {
    height: widthPresets[4],
    marginBottom: marginPresets[4],
  },
  gridRow5: {
    height: widthPresets[5],
    marginBottom: marginPresets[5],
  },
  gridRow6: {
    height: widthPresets[6],
    marginBottom: marginPresets[6],
  },
  gridRow8: {
    height: widthPresets[8],
    marginBottom: marginPresets[8],
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
  gridCol3: {
    width: widthPresets[3],
    marginRight: marginPresets[3],
  },
  gridCol4: {
    width: widthPresets[4],
    marginRight: marginPresets[4],
  },
  gridCol5: {
    width: widthPresets[5],
    marginRight: marginPresets[5],
  },
  gridCol6: {
    width: widthPresets[6],
    marginRight: marginPresets[6],
  },
  gridCol8: {
    width: widthPresets[8],
    marginRight: marginPresets[8],
  },
});
