import { 
  Platform,
  StatusBar,
  ViewStyle, 
  StyleSheet, 
  SafeAreaView, 
} from 'react-native';

const Screen = ({
  children,
  style,
} : {
  children: any;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <SafeAreaView style={[style, styles.container]}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});