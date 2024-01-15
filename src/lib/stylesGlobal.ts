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
  },
  marginTopDefault: {
    marginTop: 10,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  h3: {
    fontSize: 28,
    fontWeight: 'bold'

  },
  h4: {
    fontSize: 26,
    fontWeight: '500',
  },
  h5: {
    fontSize: 24,
    fontWeight: '500',

  },
  h6: {
    fontSize: 22,
    fontWeight: '500',

  },
  s1: {
    fontSize: 18,
    fontWeight: '400',
  }
});