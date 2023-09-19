import { PieceAuth, createPiece } from '@activepieces/pieces-framework';
import { addPerson } from './lib/actions/add-person.action/add-person.action';
import { pipedriveTriggers as triggers } from './lib/trigger';

export const pipedriveAuth = PieceAuth.OAuth2({
  description: '',

  authUrl: 'https://oauth.pipedrive.com/oauth/authorize',
  tokenUrl: 'https://oauth.pipedrive.com/oauth/token',
  required: true,
  scope: ['admin', 'contacts:full', 'users:read'],
});

export const pipedrive = createPiece({
  displayName: 'Pipedrive',
  minimumSupportedRelease: '0.5.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/pipedrive.png',
  auth: pipedriveAuth,
  actions: [addPerson],
  authors: ['ashrafsamhouri', 'kishanprmr'],
  triggers,
});
