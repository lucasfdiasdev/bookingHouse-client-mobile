import { 
  Text,
  View,
  ViewStyle,
  StyleSheet,
  Pressable,
 } from 'react-native';

import { colors } from '../../constants/Colors';
import { WIDTH } from '../../constants/Constants';

const AuthButton = ({
  style
}: {
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <View style={style}>
      <Pressable
        style={styles.containerSignIn}
        onPress={() => console.log('navigate to SignIn')}
      >
        <Text 
          style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: colors.white,   
          }}
        >
          Sign In
        </Text>
      </Pressable>

      <Pressable
        style={styles.containerSignUp}
        onPress={() => console.log('navigate to SignIn')}
      >
        <Text 
          style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: colors.primary 
          }}
        >
          Create Account
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  containerSignIn: {
    width: WIDTH,
    padding: 12,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  containerSignUp: {
    width: WIDTH,
    padding: 12,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
});