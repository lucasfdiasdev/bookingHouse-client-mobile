import * as yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Text } from '@ui-kitten/components';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/user';
import { LISTMARGIN } from '../constants/Constants';

import OrDivider from './OrDivider';
import Screen from '../components/layout/Screen';
import Loading from '../components/layout/Loading';
import InputPassword from '../components/InputPassword';
import AppleButton from '../components/auth/AppleButton';
import HeaderModal from '../components/layout/HeaderModal';
import GoogleButton from '../components/auth/GoogleButton';
import FacebookButton from '../components/auth/FacebookButton';

const LoginScreen = () => {
  const navigation = useNavigation() as any;
  const { login } = useAuth();

  const nativeLogin = useMutation(async (values: { email: string; password: string }) => {
    const user = await loginUser(values.email, values.password);
    if (user) {
      login(user);
      navigation.goBack();
    }

  });

  if (nativeLogin.isLoading) return <Loading/>


  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <HeaderModal text='BookingHouses' xShown/>
        <Text category='h5' style={styles.header}>
          Sign In
        </Text>
        <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required("Your email is required."),
              password: yup.string().required("A password is required."),
            })}
            onSubmit={(values) => {
              nativeLogin.mutate(values);
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
                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() => navigation.navigate('forgoutPassword')} 
                >
                  <Text category={'c1'} status={'info'}>Forgot your password?</Text>
                </TouchableOpacity>
                <Button 
                  style={styles.signInButton}
                  onPress={() => handleSubmit()}
                >
                  Sign In
                </Button>
                <OrDivider style={styles.orContainer}/>
                <GoogleButton
                  text='Continue with Google'
                  style={styles.button}
                  onPress={() => console.log('google login')}
                />
                <FacebookButton
                  text="Continue with Facebook"
                  style={styles.button}
                  onPress={() => console.log('Facebook login')}
                />
                {Platform.OS === 'ios' && (
                  <AppleButton
                    type='sign-in'
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

export default LoginScreen;

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
