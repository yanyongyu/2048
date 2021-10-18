import * as React from "react";

import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { NUMBERS, SIZES } from "../types";
import { Position, Tile as TileProps } from "../hooks/useGridController";

import { useSizeContext } from "../hooks/useSizeContext";

export function Tile({
  position: { x, y },
  previousPosition,
  mergedFrom,
  value,
}: TileProps): JSX.Element {
  const { size } = useSizeContext();
  const tileMerged: boolean = !!mergedFrom;
  const tileNew: boolean = !tileMerged && !previousPosition;

  // define animates
  const animateMove = React.useRef(
    new Animated.ValueXY({
      x: x * widthPresets[size] + (x + 1) * marginPresets[size],
      y: y * widthPresets[size] + (y + 1) * marginPresets[size],
    })
  ).current;
  // const [previous, setPrevious] = React.useState<Position>({ x, y });
  const newAnimationMove = () => {
    Animated.timing(animateMove, {
      toValue: {
        x: x * widthPresets[size] + (x + 1) * marginPresets[size],
        y: y * widthPresets[size] + (y + 1) * marginPresets[size],
      },
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };
  const animateAppear = React.useRef(new Animated.Value(0)).current;
  const newAnimationAppear = () => {
    Animated.timing(animateAppear, {
      toValue: 1,
      easing: Easing.ease,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const animatePop = React.useRef(new Animated.Value(0)).current;
  const newAnimationPop = () => {
    Animated.timing(animatePop, {
      toValue: 1,
      duration: 200,
      delay: 100,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      useNativeDriver: false,
    }).start();
  };

  // do animates
  React.useEffect(() => {
    if (tileNew) {
      newAnimationAppear();
    } else if (tileMerged) {
      newAnimationPop();
    }
  }, []);
  React.useEffect(() => {
    newAnimationMove();
  }, [x, y]);

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          width: widthPresets[size],
          height: widthPresets[size],
        },
        {
          transform: [
            {
              translateX: animateMove.x,
            },
            {
              translateY: animateMove.y,
            },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.tileInner,
          {
            backgroundColor:
              bgPresets[value as typeof NUMBERS[number]] || bgPresets.Super,
          },
          tileNew && [
            styles.tileNew,
            {
              opacity: animateAppear,
              transform: [
                {
                  scale: animateAppear,
                },
              ],
            },
          ],
          tileMerged && [
            styles.tileMerged,
            {
              transform: [
                {
                  scale: animatePop,
                },
              ],
            },
          ],
        ]}
      >
        <Text
          style={[
            styles.tileText,
            {
              fontSize:
                fontPresets[value as typeof NUMBERS[number]] ||
                fontPresets.Super,
              color:
                colorPresets[value as typeof NUMBERS[number]] ||
                colorPresets.Super,
            },
          ]}
        >
          {value}
        </Text>
      </Animated.View>
    </Animated.View>
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

const styles = StyleSheet.create({
  tile: {
    position: "absolute",
  },
  tileInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  tileNew: {},
  tileMerged: {
    zIndex: 20,
  },
  tileText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
