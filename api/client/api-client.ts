import {
  HttpClient,
  THttpClientConfig,
  THttpRequestConfig,
  THttpResponse,
} from "@/packages";
import { env } from "@/env";

export type TApiClientOut<T> = Promise<T>;

class ApiClient {
  private readonly _httpClient!: HttpClient;

  constructor(config: THttpClientConfig) {
    this._httpClient = new HttpClient(config);
  }

  async get<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    config?: THttpRequestConfig<TIn>
  ): TApiClientOut<TOut> {
    try {
      const response = await this._httpClient.get<TIn, TOut>(url, config);

      this._validateResponse<THttpResponse<TOut, any>>(response);

      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  async post<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    data?: TIn,
    config?: THttpRequestConfig<TIn>
  ): TApiClientOut<TOut> {
    try {
      const response = await this._httpClient.post<TIn, TOut>(
        url,
        data,
        config
      );

      this._validateResponse<THttpResponse<TOut, any>>(response);

      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  async put<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    data?: TIn,
    config?: THttpRequestConfig<TIn>
  ): TApiClientOut<TOut> {
    try {
      const response = await this._httpClient.put<TIn, TOut>(url, data, config);

      this._validateResponse<THttpResponse<TOut, any>>(response);

      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  async delete<TIn extends object = {}, TOut extends object = {}>(
    url: string,
    config?: THttpRequestConfig<TIn>
  ): TApiClientOut<TOut> {
    try {
      const response = await this._httpClient.delete<TIn, TOut>(url, config);

      this._validateResponse<THttpResponse<TOut, any>>(response);

      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  private _validateResponse<TResponse>(respone: TResponse) {}
}

export const apiClient = new ApiClient({
  baseURL: env.BASE_URL,
});
