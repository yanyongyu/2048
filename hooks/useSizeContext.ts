import * as React from "react";

import { SIZES } from "../types";

export const SizeContext = React.createContext<typeof SIZES[number]>(4);

export function useSize(): typeof SIZES[number] {
  return React.useContext(SizeContext);
}
