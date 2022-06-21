/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { call } from 'redux-saga/effects';

export const configurApi = (baseURL:string) => axios.create({ baseURL });
export const api = configurApi(process.env.REACT_APP_API_URL as string);

export function* callApi(requestConfig: AxiosRequestConfig) {
  console.log('start call');

  const response: AxiosResponse =
  yield call<(config: AxiosRequestConfig) => void>(api, requestConfig);

  console.log('call:', response);
  return response.data;
}