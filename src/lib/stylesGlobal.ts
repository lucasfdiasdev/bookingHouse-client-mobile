import { StyleSheet } from "react-native";
import { colors } from "../constants/Colors";

export const globalStyles = StyleSheet.create({
  divider: {
    borderColor: colors.gray_light,
    borderBottomWidth: 0.3,
    marginVertical: 10
  },
  alignDefault: {
    alignItems: 'center'
  }
})