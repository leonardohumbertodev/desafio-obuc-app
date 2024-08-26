import { action } from 'mobx';
import _get from 'lodash/get';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../provider';

export class Login {
  @action
  authUser = async (body: any) => {
    try {
      const requestOptions = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        }
      };

      const response = await axiosInstance.post("/login", body, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: _get(error.response, "status", ""), message: _get(error.response?.data, "message", "") };
    };
  };

  @action
  authUserRefresh = async () => {
    try {
      let userData: any = await AsyncStorage.getItem("userData");
      let token = JSON.parse(userData);
      const requestOptions = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + _get(token, "accessToken"),
          'refresh_token': _get(token, "refreshToken")
        }
      };

      const response = await axiosInstance.post("/login/refresh-tokens", {}, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
    };
  };

  @action
  registerAccount = async (body: any) => {
    const requestOptions = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axiosInstance.post("/register", body, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
    };
  };

  @action
  authLogout = async () => {
    try {
      let userData: any = await AsyncStorage.getItem("userData");
      let token = JSON.parse(userData);
      const requestOptions = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + _get(token, "accessToken")
        }
      };

      const response = await axiosInstance.post("/login/logout", {}, requestOptions);

      return { data: response.data, status: response.status, };
    } catch (error: any) {
      return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
    };
  };
};