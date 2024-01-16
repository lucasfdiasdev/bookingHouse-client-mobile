import * as yup from 'yup';
import { Formik } from 'formik';
import { 
  Platform, 
  StyleSheet, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { LISTMARGIN } from '../constants/Constants';
import { Button, Input, Text } from '@ui-kitten/components';

import OrDivider from './OrDivider';
import Screen from '../components/layout/Screen';
import InputPassword from '../components/InputPassword';
import AppleButton from '../components/auth/AppleButton';
import HeaderModal from '../components/layout/HeaderModal';
import GoogleButton from '../components/auth/GoogleButton';
import FacebookButton from '../components/auth/FacebookButton';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        <HeaderModal text='BookingHouses' xShown/>
        <Text category='h5' style={styles.header}>
          Sign Up
        </Text>
        <Formik
            initialValues={{
              email: "",
              password: "",
              lastName: "",
              firstName: "",
            }}
            validationSchema={yup.object().shape({
              firstName: yup.string().required("Your first name is required"),
              lastName: yup.string().required("Your last name is required"),
              email: yup.string().email().required("Your email is required."),
              password: yup
                .string()
                .required("A password is required.")
                .matches(
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                  "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
                ),
            })}
            onSubmit={(values) => {
              console.log('Register', values)
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
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  placeholder="Your First Name"
                  textContentType="givenName"
                  autoComplete="name"
                  label="First Name"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("firstName")}
                  caption={
                    touched.firstName && errors.firstName ? errors.firstName : undefined
                  }
                  status={touched.firstName && errors.firstName ? "danger" : "basic"}
                />

                <Input
                  style={styles.input}
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  placeholder="Your Last Name"
                  textContentType="familyName"
                  autoComplete="name"
                  label="Last Name"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("lastName")}
                  caption={
                    touched.lastName && errors.lastName ? errors.lastName : undefined
                  }
                  status={touched.lastName && errors.lastName ? "danger" : "basic"}
                />
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
                
                <Button 
                  style={styles.signInButton}
                  onPress={() => handleSubmit()}
                >
                  Sign Up
                </Button>
                <OrDivider style={styles.orContainer}/>
                <GoogleButton
                  text='Continue with Google'
                  style={styles.button}
                  onPress={() => console.log('google register')}
                />
                <FacebookButton
                  text="Continue with Facebook"
                  style={styles.button}
                  onPress={() => console.log('Facebook register')}
                />
                {Platform.OS === 'ios' && (
                  <AppleButton
                    type='sign-up'
                    onPress={() => console.log('google login')}
                  />)
                }
              </>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 5
  },
  signInButton: {
    marginTop: 20
  },
  orContainer: {
    marginVertical: 30,
  },
  button: {
    marginBottom: 10
  }
});