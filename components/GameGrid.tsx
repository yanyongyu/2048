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
} from "react-native-gesture-handler";

import { Grid } from "./Grid";
import { View } from "react-native";

export function GameGrid({
  disabled = false,
}: {
  disabled?: Boolean;
}): JSX.Element {
  const { getTiles, move } = useGridControllerContext();

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
      <View>
        <Grid tiles={getTiles()} />
      </View>
    </PanGestureHandler>
  );
}
