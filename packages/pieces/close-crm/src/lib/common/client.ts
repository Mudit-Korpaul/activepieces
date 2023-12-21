import {
  HttpMethod,
  HttpMessageBody,
  httpClient,
  HttpResponse,
  QueryParams,
  AuthenticationType,
} from '@activepieces/pieces-common';
import { closeCRMCommon } from '.';

export class CloseCRMClient {
  constructor(private apiKey: string) {}
  async makeRequest<T extends HttpMessageBody>(
    method: HttpMethod,
    url: string,
    body: any | undefined = undefined,
    query?: QueryParams
  ): Promise<HttpResponse<T>> {
    return await httpClient.sendRequest<T>({
      method: method,
      url: closeCRMCommon.baseUrl + url,
      authentication: {
        type: AuthenticationType.BASIC,
        username: this.apiKey,
        password: '',
      },
      body: body,
      queryParams: query,
    });
  }
}
