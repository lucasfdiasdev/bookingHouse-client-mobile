import { 
  ViewStyle, 
  StyleSheet, 
} from 'react-native';

import { Divider, Text } from '@ui-kitten/components';
import { colors } from '../constants/Colors';

import Row from '../components/layout/Row';

const OrDivider = ({
  style
}: {
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <Row style={[ styles.container, style as ViewStyle]}>
      <Divider style={styles.divider}/>
      <Text style={styles.orText} appearance='hint'>Or</Text>
      <Divider style={styles.divider}/>
    </Row>
  )
}

export default OrDivider

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    borderWidth: 1,
    width: '45%',
    borderColor: colors.gray_light
  },
  orText: {
    paddingHorizontal: 10,
    marginTop: -5
  }
})