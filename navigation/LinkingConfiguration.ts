import * as Linking from "expo-linking";

import { LinkingOptions } from "@react-navigation/native";
import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Home: "",
      Game: "game",
    },
  },
};

export default linking;
