import * as React from "react";

import { StyleSheet, View } from "react-native";

export function Container({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    color: "#776e65",
    backgroundColor: "#faf8ef",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
  },
});
