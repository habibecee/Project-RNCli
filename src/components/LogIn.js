import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';
import {Controller} from 'react-hook-form';
import {MainContext} from '../Context/Context';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';

export default function LogIn() {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, dirty},
    logIn,
  } = useContext(MainContext);

  return (
    <View style={styles.InputContainer}>
      <Text style={styles.InputText}>UserName</Text>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Please enter your email!'},
          validate: value => {
            return (
              [/[a-z]/, /[@]/, /[.]/].every(pattern => pattern.test(value)) ||
              'Please enter a valid email address!'
            );
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={colors.secondary}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
          />
        )}
        name="Username"
      />
      {errors?.username && (
        <Text style={styles.ErrorText}>{errors?.username?.message}</Text>
      )}

      <Text style={styles.InputText}>Password</Text>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Please enter your password!'},
          maxLength: {value: 20, message: 'Password is too long!'},
          minLength: {
            value: 6,
            message: 'Password is minimum 6 characters!',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={colors.secondary}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            autoCapitalize={'none'}
          />
        )}
        name="password"
      />
      {errors?.password && (
        <Text style={styles.ErrorText}>{errors?.password?.message}</Text>
      )}

      <TouchableOpacity
        style={
          !isValid
            ? [styles.ButtonContainer, {opacity: 0.7}]
            : styles.ButtonContainer
        }
        disabled={!isValid}
        onPress={handleSubmit(logIn)}>
        <Text style={styles.ButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: 'center',
  },

  Avatar: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginBottom: 20,
    width: 150,
    minHeight: 150,
    borderRadius: 100,
  },

  InputContainer: {
    margin: 10,
    padding: 10,
    gap: 10,
  },

  InputText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.dark,
  },

  TextInput: {
    borderWidth: 1,
    borderColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.dark,
  },

  ErrorText: {
    color: 'red',
    fontFamily: fonts.regular,
    fontSize: 16,
  },

  ButtonContainer: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
  },
  ButtonText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
