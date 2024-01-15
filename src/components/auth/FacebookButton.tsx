import { 
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import { colors } from '../../constants/Colors';

import FacebookLogo from '../svg/FacebookLogo';

WebBrowser.maybeCompleteAuthSession();

const FacebookButton = ({
  text,
  style,
  onPress,
}: {
  text: string;
  onPress: () => void
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
   <TouchableOpacity 
    style={[ styles.button, style]}
    onPress={onPress}
  >
      <FacebookLogo style={styles.logo}/>
      <Text style={styles.textBtn}>{text}</Text>
   </TouchableOpacity>
  );
};

export default FacebookButton

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  textBtn: {
    color: '#36454f',
    marginLeft: 40,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
})