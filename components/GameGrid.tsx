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

import { Grid } from "./Grid";

export function GameGrid({
  disabled = false,
}: {
  disabled?: Boolean;
}): JSX.Element {
  const { getTiles, saveState, move } = useGridControllerContext();

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
      <Grid tiles={getTiles()} />
    </PanGestureHandler>
  );
}
