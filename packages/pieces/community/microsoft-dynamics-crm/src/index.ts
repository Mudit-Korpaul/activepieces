import {
  createPiece,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';

export const dynamicsCRMAuth = PieceAuth.OAuth2({
  props: {
    hostUrl: Property.ShortText({
      displayName: 'Host URL',
      description:
        'Host URL without trailing slash.For example **https://demo.crm.dynamics.com**',
      required: true,
    }),
  },
  required: true,
  scope: [
    'https://orgac098933.crm.dynamics.com/.default',
    'openid',
    'email',
    'profile',
    'offline_access',
  ],
  authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
});

export const microsoftDynamicsCrm = createPiece({
  displayName: 'Microsoft Dynamics CRM',
  auth: dynamicsCRMAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/microsoft-dynamics-crm.png',
  authors: ['kishanprmr'],
  actions: [],
  triggers: [],
});
