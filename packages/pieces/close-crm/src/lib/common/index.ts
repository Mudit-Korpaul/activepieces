import { CloseCRMClient } from './client';

export function makeClient(apiKey: string): CloseCRMClient {
  return new CloseCRMClient(apiKey);
}

export const closeCRMCommon = {
  baseUrl: 'https://api.close.com/api/v1',
};
