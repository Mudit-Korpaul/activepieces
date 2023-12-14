import { HeartbeatClient } from './client';
import { Property } from '@activepieces/pieces-framework';

export function makeClient(apiKey: string): HeartbeatClient {
  return new HeartbeatClient(apiKey);
}

export const heartbeatCommon = {
  baseUrl: 'https://api.heartbeat.chat/v0',
  userId: (displayName: string, description: string, required = false) =>
    Property.Dropdown({
      displayName,
      description,
      required,
      refreshers: [],
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'please authenticate first',
          };
        }
        const client = makeClient(auth as string);
        const res = await client.listUsers();
        return {
          disabled: false,
          options: res.map((user) => {
            return {
              label: user.name,
              value: user.id,
            };
          }),
        };
      },
    }),
};
