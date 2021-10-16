import * as React from "react";

import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { NUMBERS, SIZES } from "../types";

import { Tile as TileProps } from "../hooks/useGridController";
import { useSemaphoreContext } from "../hooks/useSemaphore";
import { useSize } from "../hooks/useSizeContext";

export function Tile({
  position: { x, y },
  previousPosition,
  mergedFrom,
  value,
}: TileProps): JSX.Element {
  const size = useSize();
  const tileMerged: boolean = !!mergedFrom;
  const tileNew: boolean = !tileMerged && !previousPosition;
  const { acquire, release } = useSemaphoreContext();

  const newAnimationAppear = () => {
    const value = new Animated.Value(0);
    Animated.timing(value, {
      toValue: 1,
      easing: Easing.ease,
      duration: 100,
      useNativeDriver: false,
    }).start(() => release());
    acquire();
    return value;
  };
  let animateAppear = null;
  if (tileNew || tileMerged) {
    animateAppear = React.useRef(newAnimationAppear()).current;
  }

  return (
    <View
      style={[
        styles.tile,
        styles[`tile${size}`],
        styles[`tile${size}Position${x}${y}`],
      ]}
    >
      <Animated.View
        style={[
          styles.tileInner,
          styles[value > 2048 ? "tileNumSuper" : `tileNum${value}`],
          tileNew
            ? [
                styles.tileNew,
                {
                  opacity: animateAppear,
                  transform: [
                    {
                      scale: animateAppear,
                    },
                  ],
                },
              ]
            : tileMerged
            ? [
                styles.tileMerged,
                {
                  opacity: animateAppear,
                  transform: [
                    {
                      scale: animateAppear,
                    },
                  ],
                },
              ]
            : null,
        ]}
      >
        <Text
          style={[
            styles.tileText,
            styles[value > 2048 ? "tileNumSuperText" : `tileNum${value}Text`],
          ]}
        >
          {value}
        </Text>
      </Animated.View>
    </View>
  );
}

export const widthPresets = {
  3: 100,
  4: 75,
  5: 60,
  6: 50,
  8: 37,
} as const;
export const marginPresets = {
  3: 9,
  4: 7,
  5: 6,
  6: 5,
  8: 4,
} as const;
export const fontPresets = {
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
export const colorPresets = {
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
export const bgPresets = {
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
  tileMerged: {
    zIndex: 3,
  },
  tileText: {
    fontWeight: "bold",
    textAlign: "center",
  },
};

for (const size of SIZES) {
  stylesheet[`tile${size}`] = {
    width: widthPresets[size],
    height: widthPresets[size],
  };
  [...Array(size)].map((_, x) => {
    [...Array(size)].map((_, y) => {
      stylesheet[`tile${size}Position${x}${y}`] = {
        transform: [
          {
            translateX: x * widthPresets[size] + (x + 1) * marginPresets[size],
          },
          {
            translateY: y * widthPresets[size] + (y + 1) * marginPresets[size],
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
