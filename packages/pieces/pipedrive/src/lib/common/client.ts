import {
  getAccessTokenOrThrow,
  HttpMethod,
  httpClient,
  QueryParams,
  HttpMessageBody,
  AuthenticationType,
} from '@activepieces/pieces-common';
import { OAuth2PropertyValue, Property } from '@activepieces/pieces-framework';
import {
  WebhookRequest,
  PipedriveUser,
  PipedriveOrganization,
  OrganizationListRequest,
  PersonCreateRequest,
} from './models';

export class PipedriveApi {
  constructor(private accessToken: string, private apiDomain: string) {}
  async makeRequest<T extends HttpMessageBody>(
    method: HttpMethod,
    url: string,
    query?: QueryParams,
    body?: object
  ): Promise<T> {
    const res = await httpClient.sendRequest<T>({
      method,
      url: this.apiDomain + url,
      queryParams: query,
      body,
      authentication: {
        type: AuthenticationType.BEARER_TOKEN,
        token: this.accessToken,
      },
    });

    return res.body;
  }
  async subscribeWebhook(request: WebhookRequest) {
    return this.makeRequest<{ data: { id: string } }>(
      HttpMethod.POST,
      '/webhooks',
      undefined,
      request
    );
  }
  async unsubscribeWebhook(webhookId: string) {
    return this.makeRequest(HttpMethod.DELETE, `/webhooks/${webhookId}`);
  }
  async listUsers() {
    return this.makeRequest<{ data: PipedriveUser[] }>(
      HttpMethod.GET,
      '/users'
    );
  }
  async listOrganizations(request: OrganizationListRequest) {
    return this.makeRequest<{ data: PipedriveOrganization[] }>(
      HttpMethod.GET,
      '/organizations',
      prepareQuery(request)
    );
  }
  async createPerson(request: PersonCreateRequest) {
    return this.makeRequest(HttpMethod.POST, '/persons', undefined, request);
  }
}

export function makeClient(propsValue: {
  auth: OAuth2PropertyValue;
}): PipedriveApi {
  const token = getAccessTokenOrThrow(propsValue.auth);
  const api_domain = propsValue.auth.data['api_domain'];
  return new PipedriveApi(token, api_domain);
}

function emptyValueFilter(
  accessor: (key: string) => any
): (key: string) => boolean {
  return (key: string) => {
    const val = accessor(key);
    return (
      val !== null &&
      val !== undefined &&
      (typeof val != 'string' || val.length > 0)
    );
  };
}

export function prepareQuery(request?: Record<string, any>): QueryParams {
  const params: QueryParams = {};
  if (!request) return params;
  Object.keys(request)
    .filter(emptyValueFilter((k) => request[k]))
    .forEach((k: string) => {
      params[k] = (request as Record<string, any>)[k].toString();
    });
  return params;
}
