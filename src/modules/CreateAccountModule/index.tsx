import { useState } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Input } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsAccount } from '../../interface/CreateAccount';
import _get from 'lodash/get';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const schema = yup.object({
  name: yup.string().required("O nome é obrigatório."),
  email: yup.string().email("Você não digitou um e-mail válido!").required("O email é obrigatório."),
  password: yup.string().min(6, "A senha deve conter no minimo 6 caracteres").required("A senha é obrigatória"),
  confirmPassword: yup.string().min(6, "A senha deve conter no minimo 6 caracteres").test('password-match', 'As duas senhas que você digitou não coincidem!', function (value) {
    return this.parent.password === value
  }).required("A senha é obrigatória")
});

const CreateAccountModule = ({ navigationBack, createAccountUser, loading }: PropsAccount): JSX.Element => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const { width } = useWindowDimensions();

  return (
    <View style={{ width: width <= 1023 ? "100%" : "50%" }}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.description}>Preencha os campos abaixo para criar sua conta.</Text>
      <View style={styles.mb14}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Digite seu nome"
              disabled={loading}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              selectionColor="#004C6D"
              cursorColor="#004C6D"
              errorMessage={errors.name && `${_get(errors.name, "message", "")}`}
              containerStyle={{ paddingHorizontal: 0 }}
              inputContainerStyle={[styles.inputContainer, { borderColor: !errors.name ? "#004C6D" : "FF4D4F" }]}
              inputStyle={styles.inputText}
              errorStyle={styles.errorInput}
            />
          )}
        />
      </View>
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
              inputContainerStyle={[styles.inputContainer, { borderColor: !errors.email ? "#004C6D" : "FF4D4F" }]}
              inputStyle={styles.inputText}
              errorStyle={styles.errorInput}
            />
          )}
        />
      </View>
      <View style={styles.mb14}>
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
              containerStyle={{ paddingHorizontal: 0, borderColor: "#FFFFFF" }}
              inputContainerStyle={[styles.inputContainer, { borderColor: !errors.password ? "#004C6D" : "FF4D4F" }]}
              inputStyle={styles.inputText}
              errorStyle={styles.errorInput}
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            secureTextEntry={showConfirm ? false : true}
            placeholder="Confirme sua senha"
            disabled={loading}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            selectionColor="#924AFE"
            cursorColor="#924AFE"
            errorMessage={errors.confirmPassword && `${_get(errors.confirmPassword, "message", "")}`}
            rightIcon={
              <Ionicons
                name={show ? "eye-outline" : "eye-off-outline"}
                size={22}
                onPress={() => setShowConfirm(!show)}
                color="#004C6D"
              />
            }
            containerStyle={{ paddingHorizontal: 0 }}
            inputContainerStyle={[styles.inputContainer, { borderColor: !errors.confirmPassword ? "#004C6D" : "FF4D4F" }]}
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
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit(createAccountUser)}>
              <Text style={styles.btnPrimaryText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mt32}>
            <TouchableOpacity style={styles.btnSecondary} onPress={navigationBack}>
              <Text style={styles.btnSecondaryText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CreateAccountModule;