import {
  HttpMessageBody,
  HttpMethod,
  QueryParams,
  httpClient,
  AuthenticationType,
} from '@activepieces/pieces-common';
import {
  HeartbeatUser,
  HeartbeatWebhookRequest,
  HeartbeatWebhookResponse,
} from './models';
import { heartbeatCommon } from '.';

export class HeartbeatClient {
  constructor(private apiKey: string) {}

  async makeRequest<T extends HttpMessageBody>(
    method: HttpMethod,
    url: string,
    query?: QueryParams,
    body?: object
  ): Promise<T> {
    const res = await httpClient.sendRequest<T>({
      method,
      url: heartbeatCommon.baseUrl + url,
      queryParams: query,
      body,
      authentication: {
        type: AuthenticationType.BEARER_TOKEN,
        token: this.apiKey,
      },
    });
    return res.body;
  }
  async listUsers(): Promise<HeartbeatUser[]> {
    return await this.makeRequest<HeartbeatUser[]>(HttpMethod.GET, '/users');
  }
  async sendDirectMessage(text: string, receiverId: string, senderId: string) {
    return await this.makeRequest(
      HttpMethod.PUT,
      '/directMessages',
      undefined,
      {
        text: text,
        to: receiverId,
        from: senderId,
      }
    );
  }
  async subscribeWebhook(
    request: HeartbeatWebhookRequest
  ): Promise<HeartbeatWebhookResponse> {
    return await this.makeRequest<HeartbeatWebhookResponse>(
      HttpMethod.PUT,
      '/webhooks',
      undefined,
      request
    );
  }
  async unsubscribeWebhook(webhookId: string) {
    return await this.makeRequest(HttpMethod.DELETE, `/webhooks/${webhookId}`);
  }
}
