import { StyleSheet, View, ViewStyle } from 'react-native';

const Row = ({
  style,
  children,
}: {
  children: any;
  style?: ViewStyle | ViewStyle[]; 
}) => {
  return (
    <View style={[ style, styles.container]}>
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
});