import {
  HttpMessageBody,
  HttpMethod,
  QueryParams,
  httpClient,
} from '@activepieces/pieces-common';

export class AcumbamailClient {
  constructor(private token: string) {}

  async makeRequest<T extends HttpMessageBody>(
    method: HttpMethod,
    url: string,
    query?: QueryParams,
    body?: object
  ): Promise<T> {
    const res = await httpClient.sendRequest<T>({
      method,
      url: 'https://acumbamail.com/api/1' + url,
      queryParams: { auth_token: this.token, ...query },
      body,
    });
    return res.body;
  }
  async getSubscribersList() {
    return this.makeRequest<
      Record<string, { name: string; description: string }>
    >(HttpMethod.GET, '/getLists/');
  }
}
