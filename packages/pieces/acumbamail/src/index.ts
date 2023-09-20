import { createPiece, PieceAuth } from '@activepieces/pieces-framework';

const markdown = `
To obtain your API key, follow these steps:

1. Login to your Acumbamail account.
2. Go to https://acumbamail.com/apidoc/
3. Under **Customer identifier**, you can see your auth token`;

export const acumbamailAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: markdown,
});

export const acumbamail = createPiece({
  displayName: 'Acumbamail',
  auth: acumbamailAuth,
  minimumSupportedRelease: '0.8.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/acumbamail.png',
  authors: ['kishanprmr'],
  actions: [],
  triggers: [],
});
