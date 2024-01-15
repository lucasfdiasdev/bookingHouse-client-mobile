import * as yup from 'yup';
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';

import Screen from '../components/layout/Screen'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderModal from '../components/layout/HeaderModal';
import { Button, Input, Text } from '@ui-kitten/components';

const ForgoutPassword = () => {
  const navigation = useNavigation() as any;
  const [ emailSent, setEmailSent ] = useState(false);

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <HeaderModal text='BookingHouse' xShown/>
        {emailSent 
          ? 
            <>
              <Text category={'h5'} style={styles.header}>
                Email Sent!
              </Text>
              <Text>
                An email containing instructions abaout how to change your password has been sent to you. Please check your junk mail or spam section if you do not see an email.
              </Text>
            </>
          : 
            <>
              <Text category={'h5'} style={styles.header}>
                Forgot your password?
              </Text>
              <Text>
                Pleasse enter your email, and we'll send you a link to change your to password
              </Text>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={yup.object().shape({
                  email: yup.string().email().required('Your email is requred'),
                })}
                onSubmit={(values) => {
                  console.log('submit to the server' ,values)
                  setEmailSent(true);
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
                      <Input
                        style={styles.input}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        placeholder="Your Email Address"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoComplete="email"
                        label="Email"
                        autoCorrect={false}
                        onBlur={() => setFieldTouched("email")}
                        caption={
                          touched.email && errors.email ? errors.email : undefined
                        }
                        status={touched.email && errors.email ? "danger" : "basic"}
                      />
                      
                      <Button
                        style={styles.button}
                        onPress={() => handleSubmit()}
                      >
                        Sign In
                      </Button>
                    </>
                  );
                }}
              </Formik>
            </>
        }
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export default ForgoutPassword;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  }
});