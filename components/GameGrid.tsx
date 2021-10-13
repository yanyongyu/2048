import * as React from "react";

import { NUMBERS, RangeOf, TYPES } from "../types";
import { StyleSheet, Text, View } from "react-native";

function Tile<T extends typeof TYPES[number]>({
  row,
  col,
  type,
  generated = false,
  merged = false,
  number,
}: {
  row: RangeOf<T>;
  col: RangeOf<T>;
  generated?: Boolean;
  merged?: Boolean;
  type: T;
  number: Number;
}): JSX.Element {
  return (
    <View
      style={[
        styles.tile,
        styles[`tile${type}`],
        styles[`tile${type}Position${row}${col}`],
      ]}
    >
      <View
        style={[
          styles.tileInner,
          styles[number > 2048 ? "tileNumSuper" : `tileNum${number}`],
          generated ? styles.tileNew : merged ? styles.tileMerged : null,
        ]}
      >
        <Text
          style={[
            styles.tileText,
            styles[number > 2048 ? "tileNumSuperText" : `tileNum${number}Text`],
          ]}
        >
          {number}
        </Text>
      </View>
    </View>
  );
}

export function GameGrid({
  type = 4,
  disabled = false,
  randomNumber = 2,
  randomRange = 1,
}: {
  type?: typeof TYPES[number];
  disabled?: Boolean;
  randomNumber?: number;
  randomRange?: number;
}): JSX.Element {
  const rowStyles = [styles.gridRow, styles[`gridRow${type}`]];
  const colStyles = [styles.gridCol, styles[`gridCol${type}`]];

  const onMoveShouldSetResponder = () => true;
  const onResponderRelease = () => {
    console.log("onResponderRelease");
  };

  return (
    <View
      style={[styles.gameWrapper, styles[`gameWrapper${type}`]]}
      onMoveShouldSetResponder={onMoveShouldSetResponder}
      onResponderRelease={onResponderRelease}
    >
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
      <View style={styles.tileContainer}>
        <Tile row={0} col={0} type={type} number={2} />
        <Tile row={0} col={1} type={type} number={4} />
        <Tile row={0} col={2} type={type} number={8} />
        <Tile row={0} col={3} type={type} number={16} />
        <Tile row={1} col={0} type={type} number={32} />
        <Tile row={1} col={1} type={type} number={64} />
        <Tile row={1} col={2} type={type} number={128} />
        <Tile row={1} col={3} type={type} number={256} />
        <Tile row={2} col={0} type={type} number={512} />
        <Tile row={2} col={1} type={type} number={1024} />
        <Tile row={2} col={2} type={type} number={2048} />
        <Tile row={2} col={3} type={type} number={4096} />
      </View>
    </View>
  );
}

const widthPresets = {
  3: 100,
  4: 75,
  5: 60,
  6: 50,
  8: 37,
} as const;
const marginPresets = {
  3: 9,
  4: 7,
  5: 6,
  6: 5,
  8: 4,
} as const;
const fontPresets = {
  2: 35,
  4: 35,
  8: 35,
  16: 35,
  32: 35,
  64: 35,
  128: 25,
  256: 25,
  512: 25,
  1024: 20,
  2048: 20,
  Super: 10,
} as const;
const colorPresets = {
  2: "#776e65",
  4: "#776e65",
  8: "#f9f6f2",
  16: "#f9f6f2",
  32: "#f9f6f2",
  64: "#f9f6f2",
  128: "#f9f6f2",
  256: "#f9f6f2",
  512: "#f9f6f2",
  1024: "#f9f6f2",
  2048: "#f9f6f2",
  Super: "#f9f6f2",
} as const;
const bgPresets = {
  2: "#eee4da",
  4: "#eee1c9",
  8: "#f3b27a",
  16: "#f69664",
  32: "#f77c5f",
  64: "#f75f3b",
  128: "#edd073",
  256: "#edcc62",
  512: "#edc950",
  1024: "#edc53f",
  2048: "#edc22e",
  Super: "#3c3a33",
} as const;

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
  tile: {
    position: "absolute",
  },
  tileInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tileNew: {},
  tileMerged: {},
  tileText: {
    fontWeight: "bold",
    textAlign: "center",
  },
};

for (const type of TYPES) {
  stylesheet[`gameWrapper${type}`] = { padding: marginPresets[type] };
  stylesheet[`gridRow${type}`] = {
    height: widthPresets[type],
    marginBottom: marginPresets[type],
  };
  stylesheet[`gridCol${type}`] = {
    width: widthPresets[type],
    marginRight: marginPresets[type],
  };
  stylesheet[`tile${type}`] = {
    width: widthPresets[type],
    height: widthPresets[type],
  };
  [...Array(type)].map((_, row) => {
    [...Array(type)].map((_, col) => {
      stylesheet[`tile${type}Position${row}${col}`] = {
        transform: [
          {
            translateX:
              col * widthPresets[type] + (col + 1) * marginPresets[type],
          },
          {
            translateY:
              row * widthPresets[type] + (row + 1) * marginPresets[type],
          },
        ],
      };
    });
  });
}
for (const number of NUMBERS) {
  stylesheet[`tileNum${number}`] = {
    backgroundColor: bgPresets[number],
  };
  stylesheet[`tileNum${number}Text`] = {
    fontSize: fontPresets[number],
    color: colorPresets[number],
  };
}

const styles = StyleSheet.create(stylesheet);
