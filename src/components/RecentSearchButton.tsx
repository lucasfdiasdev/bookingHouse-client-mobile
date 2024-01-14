import { 
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../constants/Colors';

const RecentSearchButton = ({
  name,
  style,
  onPress,
}: {
  name: string;
  style?: ViewStyle;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color={colors.primary} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default RecentSearchButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderColor: colors.gray_light,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 10
  }
});