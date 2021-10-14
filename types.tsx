import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  Game: {
    type: Number;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RangeOf<
  N extends number,
  A extends number[] = []
> = A["length"] extends N ? A : RangeOf<N, [...A, A["length"]]>;

export const TYPES = [3, 4, 5, 6, 8] as const;
export const NUMBERS = [
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024,
  2048,
  "Super",
] as const;
