import { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../interface/General';
import { useStore } from '../../hooks/useStore';
import { PropsBody } from '../../interface/CreateAccount';
import _get from 'lodash/get';
import CreateAccountModule from '../../modules/CreateAccountModule';
import { activeToast } from '../../utils';
import { baseStyles } from '../../styles/global';

type CreateAccountProps = NativeStackScreenProps<RootStackParamList, "CreateAccount">;

const CreateAccount = ({ navigation }: CreateAccountProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useStore();
  const { registerAccount } = login;

  const handleCreateAccountUser = async (body: PropsBody) => {
    setLoading(true);

    const formattedBody = {
      email: _get(body, "email").toLowerCase().trim(),
      name: _get(body, "name"),
      password: _get(body, "password"),
    };

    const response: any = await registerAccount(formattedBody);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setLoading(false);
      activeToast("success", "Conta criada", "Sua conta foi criada com sucesso.");
      handleNavigationBack();
    } else {
      activeToast("error", "Houve um problema", response.message);
      setLoading(false);
    };
  };

  const handleNavigationBack = (): void => {
    navigation.navigate("Login");
  };

  return (
    <View style={[baseStyles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
      <CreateAccountModule
        loading={loading}
        createAccountUser={handleCreateAccountUser}
        navigationBack={handleNavigationBack}
      />
    </View>
  );
};

export default CreateAccount;