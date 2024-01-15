import { 
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Row from './Row';
import { Text } from '@ui-kitten/components';

const HeaderModal = ({
  text,
  style,
  xShown,
}: {
  text?: string;
  xShown?: boolean;
  style?: ViewStyle | ViewStyle[];
}) => {
  
  const navigation = useNavigation();
  
  if(text) {
    return (
      <Row style={[style as ViewStyle, styles.container]}>
        {
          xShown ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.x}
            >
              <MaterialCommunityIcons 
                name="close"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ): null
        }
        <Text category='h5'>{text}</Text>
      </Row>
    );
  };

  return (
    <View style={[style as ViewStyle, styles.container]}>
      <View style={styles.bar}/>
    </View>
  );
};

export default HeaderModal;

const styles = StyleSheet.create({
  x: {
    position: 'absolute', 
    left: 10, 
    alignSelf: 'center',
  },
  container: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#a4a4a4',
  },
  bar: {
    width: 50,
    height: 5,
    borderRadius: 30,
    backgroundColor: '#a4a4a4',
  },
});