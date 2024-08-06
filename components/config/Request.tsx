import instance from './AxiosInstance';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

enum MethodEnums {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
  }

const request = <T, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) => {
    return instance.request<T, R>({ ...config, ...options });
  };
  
  export function get<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
    return request<T, R>({ ...config, method: MethodEnums.GET }, options);
  }
  
  export function post<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
    return request<T, R>({ ...config, method: MethodEnums.POST }, options);
  }
  
  export function patch<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
    return request<T, R>({ ...config, method: MethodEnums.PATCH }, options);
  }
  
  export function put<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
    return request<T, R>({ ...config, method: MethodEnums.PUT }, options);
  }
  
  export function remove<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
    return request<T, R>({ ...config, method: MethodEnums.DELETE }, options);
  }

export default request;
