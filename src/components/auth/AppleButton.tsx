import { Platform, StyleSheet, Text, View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';

const AppleButton = ({
  type,
  onPress
}: {
  onPress: () => void;
  type: 'sign-in' | 'sign-up';
}) => {
  if(Platform.OS === 'ios') return null;
  if(!AppleAuthentication.isAvailableAsync()) return null;
  
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={
        type === 'sign-in'
        ? AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
        : AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
      }
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={5}
      style={styles.button}
      onPress={onPress}
    />
  );
};

export default AppleButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
  }
});