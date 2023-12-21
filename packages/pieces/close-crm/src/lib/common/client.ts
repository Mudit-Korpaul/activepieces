import {
  HttpMethod,
  HttpMessageBody,
  httpClient,
  HttpResponse,
  QueryParams,
  AuthenticationType,
} from '@activepieces/pieces-common';
import { closeCRMCommon } from '.';
import { WebhookCreateRequest } from './models';

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
  async subscribeWebhook(request: WebhookCreateRequest) {
    return await this.makeRequest(HttpMethod.POST, '/webhook/', request);
  }
  async unsubscribeWebhook(webhookId: string) {
    return await this.makeRequest(HttpMethod.DELETE, `/webhook/${webhookId}/`);
  }
}
