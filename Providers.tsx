import { GridContext, useGridController } from "./hooks/useGridController";
import { SizeContext, useSize } from "./hooks/useSizeContext";

import Navigation from "./navigation";
import React from "react";

export function Providers(): JSX.Element {
  const size = useSize();
  return (
    <SizeContext.Provider value={size}>
      <GridProvider />
    </SizeContext.Provider>
  );
}

function GridProvider(): JSX.Element {
  const gridController = useGridController();
  return (
    <GridContext.Provider value={gridController}>
      <Navigation />
    </GridContext.Provider>
  );
}
