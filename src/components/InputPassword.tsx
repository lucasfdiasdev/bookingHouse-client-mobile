import React, { useState } from 'react'
import { 
  TextStyle, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

import { Input } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { LISTMARGIN } from '../constants/Constants';
import { EvaStatus } from '@ui-kitten/components/devsupport';

const InputPassword = ({
  label,
  value,
  style,
  onBlur,
  caption,
  placeholder,
  onChangeText,
  status
}: {
  label: string;
  value: string;
  status?: EvaStatus;
  caption?: string;
  onBlur?: () => void;
  placeholder?: string;
  style?: TextStyle | TextStyle[];
  onChangeText?: (text: string) => void;
}) => {
  const [ passwordHidden, setPasswordHidden ] = useState<boolean>(true);

  const getEyeIcon = () => {
    if( passwordHidden)
    return (
      <MaterialCommunityIcons 
        name="eye-off-outline" 
        size={24} 
        color="black" 
      />
    );

    return (
      <MaterialCommunityIcons 
        name="eye-outline" 
        size={24} 
        color="black" 
      />
    );
  };

  return (
    <Input
      style={style}
      value={value}
      onChangeText={onChangeText}
      autoComplete='password'
      autoCapitalize='none'
      placeholder={placeholder}
      caption={caption}
      label={label}
      secureTextEntry={passwordHidden}
      onBlur={onBlur}
      status={status}
      accessoryRight={() => (
        <TouchableOpacity
          style={styles.eyeContainer}
          onPress={() => setPasswordHidden(!passwordHidden)}
        >
          {getEyeIcon()}
        </TouchableOpacity>
      )}
    />
  );
};

export default InputPassword;

const styles = StyleSheet.create({
  eyeContainer: {
    paddingHorizontal: LISTMARGIN,
  }
});