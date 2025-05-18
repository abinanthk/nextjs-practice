import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  AxiosError,
} from "axios";

export type THttpClientInstance = AxiosInstance;
export type THttpClientConfig = CreateAxiosDefaults;
export type THttpRequestConfig<D = any> = AxiosRequestConfig<D>;
export type THttpResponse<T = any, D = any> = AxiosResponse<T, D>;
export type THttpError<T = any, D = any> = AxiosError<T, D>;

export class HttpClient {
  private _client: THttpClientInstance;

  constructor(config: THttpClientConfig) {
    this._client = axios.create(config);
  }

  get<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    config?: THttpRequestConfig<TIn>
  ) {
    return this._client.get<TOut, THttpResponse<TOut>, TIn>(url, config);
  }

  post<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    data?: TIn,
    config?: THttpRequestConfig<TIn>
  ) {
    return this._client.post<TOut, THttpResponse<TOut>, TIn>(url, data, config);
  }

  put<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    data?: TIn,
    config?: THttpRequestConfig<TIn>
  ) {
    return this._client.put<TOut, THttpResponse<TOut>, TIn>(url, data, config);
  }

  delete<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    config?: THttpRequestConfig<TIn>
  ) {
    return this._client.delete<TOut, THttpResponse<TOut>, TIn>(url, config);
  }
}
