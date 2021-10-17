import "react-native-gesture-handler";

import { SizeContext, useSize } from "./hooks/useSizeContext";

import Navigation from "./navigation";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";

export default function App(): JSX.Element | null {
  const size = useSize();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SizeContext.Provider value={size}>
          <Navigation />
        </SizeContext.Provider>
      </SafeAreaProvider>
    );
  }
}
