import { 
  Text,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Row from './Row';

const HeaderModal = ({
    text,
    style,
    xShown,
  }: {
    text?: string;
    xShown?: boolean;
    style?: ViewStyle | ViewStyle[];
  }) => {
  
  const navigation = useNavigation() as any;
  
  if(text) {
    return (
      <Row style={[style as ViewStyle, styles.container]}>
        {
          xShown ? (
            <MaterialCommunityIcons 
              onPress={() => navigation.goback()}
              style={styles.x}
              name="close" 
              size={24} 
              color="black" 
            />
          ): null
        }
        <Text style={styles.h5}>{text}</Text>
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
  h5: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bar: {
    width: 50,
    height: 5,
    borderRadius: 30,
    backgroundColor: '#a4a4a4',
  },
});