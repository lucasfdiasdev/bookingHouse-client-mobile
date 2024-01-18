import * as yup from 'yup';
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Text } from '@ui-kitten/components';
import { LISTMARGIN } from '../constants/Constants';

import Screen from '../components/layout/Screen';
import InputPassword from '../components/InputPassword';
import HeaderModal from '../components/layout/HeaderModal';
import { useNavigation } from '@react-navigation/native';


const ResetPassword = ({
  route,
}: { 
   route?: { params: { token: string; }}
}) => {
  const navigation = useNavigation() as any;

  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        <HeaderModal text='Booking Houses' xShown/>
        <Text category='h5' style={styles.header}>
          Reset Password
        </Text>
        <Formik
            initialValues={{
              password: "",
              passwordRepeat: "",
            }}
            validationSchema={yup.object().shape({
              password: yup
                .string()
                .required("A password is required.")
                .matches(
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                  "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
                ),
                passwordRepeat: yup
                .string()
                .oneOf([yup.ref('password'), undefined], "Passwords don't match")
                .required("Required")
            })}
            onSubmit={(values) => {
              console.log('resetPassword', values)
            }}
          >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit, 
            setFieldTouched
          }) => {
            return (
              <>
                <InputPassword
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder='Your password'
                  label='Password'
                  onBlur={() => setFieldTouched('password')}
                  caption={
                    touched.password && errors.password
                    ? errors.password
                    : undefined
                  }
                  status={
                    touched.password && errors.password 
                    ? 'danger' 
                    : 'basic'
                  }
                />
                <InputPassword
                  style={styles.input}
                  value={values.passwordRepeat}
                  onChangeText={handleChange("passwordRepeat")}
                  placeholder='Your password repeat'
                  label='Password'
                  onBlur={() => setFieldTouched('passwordRepeat')}
                  caption={
                    touched.passwordRepeat && errors.passwordRepeat
                    ? errors.passwordRepeat
                    : undefined
                  }
                  status={
                    touched.passwordRepeat && errors.passwordRepeat 
                    ? 'danger' 
                    : 'basic'
                  }
                />
                
                <Button
                  style={styles.submitButton}
                  onPress={() => handleSubmit()}
                >
                  Reset Password
                </Button>
              </>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
  },
  header: {
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20
  },
});