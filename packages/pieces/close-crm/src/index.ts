import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { closeCRMTriggers as triggers } from './lib/triggers';
export const closeCrmAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: `
  1.Log in to your Close CRM account.
  2.Navigate to **Settings->Developer->New API Key**.
  3.Enter a name for the API key and click Save.
  4.Copy the API Key to your clipboard.`,
});

export const closeCrm = createPiece({
  displayName: 'Close-crm',
  auth: closeCrmAuth,
  minimumSupportedRelease: '0.9.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/close-crm.png',
  authors: [],
  actions: [],
  triggers: triggers,
});
