import { createPiece, PieceAuth } from '@activepieces/pieces-framework';

export const formaloo = createPiece({
  displayName: 'Formaloo',
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.8.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/formaloo.png',
  authors: ['kishanprmr'],
  actions: [],
  triggers: [],
});
