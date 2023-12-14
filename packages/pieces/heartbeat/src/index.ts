import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
export const heartbeatAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: `
  To obtain your API Key, follow these steps:

  1. Log in to your Heartbeat account.
  2. Click on your profile pic on left bottom to open settings.
  3. Click on **API Keys**.
  4. Click on **Create API Key** and give any label.Then click on **Create**.
  5. Click on **Copy** button for your labeled key to copy API Key.
  `,
});
export const heartbeat = createPiece({
  displayName: 'Heartbeat',
  auth: heartbeatAuth,
  minimumSupportedRelease: '0.9.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/heartbeat.png',
  authors: ['kishanprmr'],
  actions: [],
  triggers: [],
});
