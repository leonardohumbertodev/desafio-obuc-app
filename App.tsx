import { useEffect, useMemo, useReducer } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/interface/General';
import { AuthContext } from './src/hooks/context';
import { useStore } from './src/hooks/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _get from 'lodash/get';
import Loading from './src/components/Loading';
import Login from './src/screens/Login';
import CreateAccount from './src/screens/CreateAccount';
import Task from './src/screens/Task';
import { activeToast } from './src/utils';
import TaskCreate from './src/screens/TaskCreate';
import TaskUpdate from './src/screens/TaskUpdade';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { login } = useStore();
  const { authLogout, authUserRefresh, authUser } = login;
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            isSignout: false,
          };
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
          };
        case 'LOADING':
          return {
            ...prevState,
            isLoading: action.isLoading,
          };
      }
    },
    {
      isLoading: false,
      isSignout: false,
      userToken: null
    }
  );
  const headerOption = {
    headerShown: true,
    headerTitle: "Obuc - Desafio",
    headerStyle: {
      backgroundColor: "#004C6D"
    },
    headerTintColor: "#FFFFFF",
    headerBackVisible: false
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch({ type: 'LOADING', isLoading: true });

      let userToken: any;
      userToken = await AsyncStorage.getItem("userData");

      if (userToken) {
        const response: any = await authUserRefresh();

        if (response.status === 200 || response.status === 201 || response.status === 204) {
          const userData = JSON.stringify(response.data);
          await AsyncStorage.setItem("userData", userData);
          dispatch({ type: 'SIGN_IN', token: response.data });
        } else {
          await AsyncStorage.clear()
          activeToast("error", "Houve um problema", response.message);
          dispatch({ type: 'LOADING', isLoading: false });
        };
      } else {
        activeToast("error", "Houve um problema", "Erro desconhecido");
        dispatch({ type: 'LOADING', isLoading: false });
      };
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => {
    return {
      signIn: async (form: any) => {
        dispatch({ type: 'LOADING', isLoading: true });

        const response: any = await authUser(form);

        if (response.status === 200 || response.status === 201 || response.status === 204) {
          const userData = JSON.stringify(response.data);
          await AsyncStorage.setItem("userData", userData);
          dispatch({ type: 'SIGN_IN', token: response.data });
        } else {
          activeToast("error", "Houve um problema", response.message);
          dispatch({ type: 'LOADING', isLoading: false });
        };
      },
      signOut: async () => {
        const response: any = await authLogout();

        if (response.status === 200 || response.status === 201 || response.status === 204) {
          await AsyncStorage.clear();
          dispatch({ type: 'SIGN_OUT' });
        } else {
          activeToast("error", "Houve um problema", response.message);
        };
      },
      state
    };
  }, [state]);

  if (state.isLoading) {
    return (
      <Loading />
    );
  };

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!state.userToken ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
              </>
            ) : (
              <>
                <Stack.Screen name="Task" component={Task} options={headerOption} />
                <Stack.Screen name="TaskCreate" component={TaskCreate} options={headerOption} />
                <Stack.Screen name="TaskUpdate" component={TaskUpdate} options={headerOption} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
      <Toast />
    </SafeAreaProvider>
  );
};