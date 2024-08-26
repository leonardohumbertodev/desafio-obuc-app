import { action } from 'mobx';
import _get from 'lodash/get';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from '../../provider';

export class Task {
  @action
  allTasks = async (status: string) => {
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

      const response = await axiosInstance.get(`/task?status=${status}`, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.clear();
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      } else {
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      };
    };
  };

  @action
  taskById = async (id: string) => {
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

      const response = await axiosInstance.get(`/task/${id}`, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.clear();
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      } else {
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      };
    };
  };

  @action
  taskCreate = async (body: any) => {
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

      const response = await axiosInstance.post("/task", body, requestOptions);

      return { data: response.data, status: response?.status };
    } catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.clear();
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      } else {
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      };
    };
  };

  @action
  taskUpdate = async (id: any, body: any) => {
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

      const response = await axiosInstance.put(`/task/${id}`, body, requestOptions);

      return { data: response.data, status: response?.status };
    } catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.clear();
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      } else {
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      };
    };
  };

  @action
  taskDelete = async (id: string) => {
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

      const response = await axiosInstance.delete(`/task/${id}`, requestOptions);

      return { data: response.data, status: response.status };
    } catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.clear();
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      } else {
        return { status: _get(error.response, "status", ""), message: _get(error.response.data, "message", "") };
      };
    };
  };
};