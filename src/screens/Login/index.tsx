import { useContext } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../interface/General';
import { AuthContext } from '../../hooks/context';
import { PropsBody } from '../../interface/Login';
import _get from 'lodash/get';
import LoginModule from '../../modules/LoginModule';
import { baseStyles } from '../../styles/global';
import Loading from '../../components/Loading';

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps): JSX.Element => {
  const { state, signIn } = useContext(AuthContext);

  const handleNewLogin = async (body: PropsBody) => {
    const formattedBody = {
      ...body,
      email: _get(body, "email").toLowerCase().trim()
    };

    signIn(formattedBody);
  };

  const handleNavigationNewAccount = (): void => {
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={[baseStyles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
      <LoginModule
        loading={state.isLoading}
        newLogin={handleNewLogin}
        navigationNewAccount={handleNavigationNewAccount}
      />
    </View>
  );
};

export default Login;