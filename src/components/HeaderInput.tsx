import { 
  Text, 
  Platform, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import { globalStyles } from '../lib/stylesGlobal';

import Row from './layout/Row';

const HeaderInput = ({
    location
  }: {
    location: string;
  }) => {
  
  const navigation = useNavigation() as any;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('findLocation') }
    >
      <Row style={globalStyles.alignDefault}>
        <AntDesign name="search1" size={20} color={colors.primary} />
        <Text style={{ marginLeft: 10 }}>{location}</Text>
      </Row>
    </TouchableOpacity>
  );
};

export default HeaderInput;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 30,
    padding: 10,
  },
});