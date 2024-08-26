import { useState } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Input } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsLogin } from '../../interface/Login';
import _get from 'lodash/get';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const schema = yup.object({
  email: yup.string().email("Você não digitou um e-mail válido!").required("O email é obrigatório."),
  password: yup.string().min(6, "A senha deve conter no mínimo 6 caracteres").required("A senha é obrigatória"),
});

const LoginModule = ({ navigationNewAccount, newLogin, loading }: PropsLogin): JSX.Element => {
  const [show, setShow] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { width } = useWindowDimensions();

  return (
    <View style={{ width: width <= 1023 ? "100%" : "50%" }}>
      <View style={styles.flexIcon}>
        <Ionicons name="person-circle-outline" size={100} color="#004C6D" />
      </View>
      <Text style={styles.title}>Conecte a sua conta</Text>
      <View style={styles.mb14}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="email-address"
              placeholder="Digite seu email"
              disabled={loading}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              selectionColor="#004C6D"
              cursorColor="#004C6D"
              errorMessage={errors.email && `${_get(errors.email, "message", "")}`}
              containerStyle={{ paddingHorizontal: 0 }}
              inputContainerStyle={[styles.inputContainer, { borderColor: !errors.password ? "#004C6D" : "FF4D4F" }]}
              inputStyle={styles.inputText}
              errorStyle={styles.errorInput}
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            secureTextEntry={show ? false : true}
            placeholder="Digite sua senha"
            disabled={loading}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            selectionColor="#004C6D"
            cursorColor="#004C6D"
            errorMessage={errors.password && `${_get(errors.password, "message", "")}`}
            rightIcon={
              <Ionicons
                name={show ? "eye-outline" : "eye-off-outline"}
                size={22}
                onPress={() => setShow(!show)}
                color="#004C6D"
              />
            }
            containerStyle={{ paddingHorizontal: 0 }}
            inputContainerStyle={[styles.inputContainer, { borderColor: !errors.password ? "#004C6D" : "FF4D4F" }]}
            inputStyle={styles.inputText}
            errorStyle={styles.errorInput}
          />
        )}
      />
      {loading ? (
        <View style={styles.mt32}>
          <ActivityIndicator size="large" color="#004C6D" />
        </View>
      ) : (
        <>
          <View style={styles.mt32}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit(newLogin)}>
              <Text style={styles.btnPrimaryText}>Acessar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mt32}>
            <TouchableOpacity style={styles.btnSecondary} onPress={navigationNewAccount}>
              <Text style={styles.btnSecondaryText}>Nova Conta</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default LoginModule;