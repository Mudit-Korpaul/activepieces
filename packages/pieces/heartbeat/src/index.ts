import { createPiece, PieceAuth } from '@activepieces/pieces-framework';

export const heartbeat = createPiece({
  displayName: 'Heartbeat',
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.9.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/heartbeat.png',
  authors: ['kishanprmr'],
  actions: [],
  triggers: [],
});
