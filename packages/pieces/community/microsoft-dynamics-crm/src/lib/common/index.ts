import {
  AuthenticationType,
  HttpMethod,
  HttpRequest,
  httpClient,
} from '@activepieces/pieces-common';
import { PiecePropValueSchema, Property } from '@activepieces/pieces-framework';
import { dynamicsCRMAuth } from '../../';
import { EntityDetails } from './constants';

export const DynamicsCRMCommon = {
  entityType: (description: string) =>
    Property.StaticDropdown({
      displayName: 'Entity Type',
      description,
      required: true,
      options: {
        disabled: false,
        options: Object.keys(EntityDetails).map((key) => {
          return {
            label: EntityDetails[key].displayName,
            value: EntityDetails[key].value,
          };
        }),
      },
    }),
  recordId: Property.Dropdown({
    displayName: 'Record ID',
    refreshers: ['entityType'],
    required: true,
    options: async ({ auth, entityType }) => {
      if (!auth || !entityType) {
        return {
          disabled: true,
          options: [],
          placeholder: 'Please select entity type first.',
        };
      }

      const entityUrlPath = EntityDetails[entityType as string].urlPath;
      const entityPrimaryKey = EntityDetails[entityType as string].primaryKey;
      const entityprimaryNameAttribute =
        EntityDetails[entityType as string].primaryNameAttribute;

      const authValue = auth as PiecePropValueSchema<typeof dynamicsCRMAuth>;

      type Response = {
        '@odata.context': string;
        value: Array<{
          [K in
            | typeof entityprimaryNameAttribute
            | typeof entityPrimaryKey]: string;
        }>;
      };

      const request: HttpRequest = {
        method: HttpMethod.GET,
        url: `${authValue.props?.['hostUrl']}/api/data/v9.2/${entityUrlPath}`,
        queryParams: {
          $select: entityprimaryNameAttribute,
        },
        authentication: {
          type: AuthenticationType.BEARER_TOKEN,
          token: authValue.access_token,
        },
        headers: {
          Accept: 'application/json',
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Content-Type': 'application/json',
        },
      };

      const { body } = await httpClient.sendRequest<Response>(request);

      return {
        disabled: false,
        options: body.value.map((val) => {
          return {
            label: val[entityprimaryNameAttribute],
            value: val[entityPrimaryKey],
          };
        }),
      };
    },
  }),
};
// {{baseUrl}}/api/data/v9.2/EntityDefinitions(LogicalName='account')/Attributes?$select=AttributeType,LogicalName,Description,DisplayName
