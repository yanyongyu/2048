import "react-native-gesture-handler";

import { Providers } from "./Providers";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Providers />
      </SafeAreaProvider>
    );
  }
}
