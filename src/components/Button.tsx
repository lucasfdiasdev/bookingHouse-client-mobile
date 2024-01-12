import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../constants/Colors';

const Button = ({
  style,
  ghost,
  wfull,
  onPress,
  children,
}: {
  children: any;
  wfull?: boolean;
  ghost?: boolean;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <Pressable 
      onPress={onPress}
      style={[
        style,
        ghost
          ? {backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary} 
          : {backgroundColor: colors.primary},
        wfull 
          ? {width: '100%'} 
          : {width: '49%'},
        {padding: 7, borderRadius: 5}
      ]}
    >
      <Text style={[
        ghost 
          ? { color: colors.primary} 
          : { color: 'white' },
        { textAlign: 'center', fontSize: 16, fontWeight: '500'}
      ]}>{children}</Text>
    </Pressable>
  );
};

export default Button;