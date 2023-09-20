import { AcumbamailClient } from './client';

export function makeClient(apiKey: string): AcumbamailClient {
  return new AcumbamailClient(apiKey);
}
