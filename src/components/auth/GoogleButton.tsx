import { 
  Text, 
  ViewStyle, 
  StyleSheet, 
  TouchableOpacity, 
} from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import GoogleLogo from '../svg/GoogleLogo';
import { colors } from '../../constants/Colors';

WebBrowser.maybeCompleteAuthSession();

const GoogleButton = ({
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
    <GoogleLogo style={styles.logo}/>
    <Text style={styles.textBtn}>{text}</Text>
   </TouchableOpacity>
  )
}

export default GoogleButton

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
    fontSize: 15,
    marginLeft: 40,
    color: '#36454f',
    fontWeight: 'bold',
    alignSelf: 'center',
  }
})