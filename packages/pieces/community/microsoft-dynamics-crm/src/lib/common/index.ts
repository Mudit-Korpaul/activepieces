import {
  AuthenticationType,
  HttpMethod,
  HttpRequest,
  httpClient,
} from '@activepieces/pieces-common';
import {
  DynamicPropsValue,
  PiecePropValueSchema,
  Property,
} from '@activepieces/pieces-framework';
import { dynamicsCRMAuth } from '../../';
import { EntityAttributeType, EntityDetails } from './constants';
import { EntityAttributeResponse } from './types';

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
  entityFields: Property.DynamicProperties({
    displayName: 'Entity Fields',
    refreshers: ['auth', 'entityType'],
    required: true,
    props: async ({ auth, entityType }) => {
      if (!auth) return {};
      if (!entityType) return {};

      const entityUrlPath =
        EntityDetails[entityType as unknown as string].urlPath;
      // const entityPrimaryKey =
      //   EntityDetails[entityType as unknown as string].primaryKey;
      // const entityprimaryNameAttribute =
      //   EntityDetails[entityType as unknown as string].primaryNameAttribute;

      const authValue = auth as PiecePropValueSchema<typeof dynamicsCRMAuth>;

      const fields: DynamicPropsValue = {};

      const request: HttpRequest = {
        method: HttpMethod.GET,
        url: `${authValue.props?.['hostUrl']}/api/data/v9.2/${entityUrlPath}/Attributes`,
        queryParams: {
          $select: 'AttributeType,LogicalName,Description,DisplayName',
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

      const { body } = await httpClient.sendRequest<EntityAttributeResponse>(
        request
      );

      for (const field of body.value) {
        if (
          ![
            EntityAttributeType.ENTITY_NAME,
            EntityAttributeType.LOOKUP,
            EntityAttributeType.MEMO,
            EntityAttributeType.MONEY,
            EntityAttributeType.OWNER,
            EntityAttributeType.STATE,
          ].includes(field.AttributeType)
        ) {
          const params = {
            displayName:
              field.DisplayName?.UserLocalizedLabel.label ?? field.LogicalName,
            description: field.Description?.UserLocalizedLabel.label ?? '',
            required: false,
          };
          switch (field.AttributeType) {
            case EntityAttributeType.BIGINT:
            case EntityAttributeType.DECIMAL:
            case EntityAttributeType.DOUBLE:
            case EntityAttributeType.INTEGER:
              fields[field.LogicalName] = Property.Number(params);
              break;
            case EntityAttributeType.DATETIME:
              fields[field.LogicalName] = Property.DateTime(params);
              break;
            case EntityAttributeType.BOOLEAN:
              fields[field.LogicalName] = Property.Checkbox(params);
              break;
            case EntityAttributeType.STRING:
              fields[field.LogicalName] = Property.ShortText(params);
              break;
            case EntityAttributeType.PICKLIST:
              const options = await retrivePicklistOptions(
                authValue,
                entityType as unknown as string,
                field.LogicalName
              );
              fields[field.LogicalName] = Property.StaticDropdown({
                ...params,
                options: {
                  disabled: false,
                  options: options,
                },
              });
          }
        }
      }
      return fields;
    },
  }),
};

async function retrivePicklistOptions(
  auth: PiecePropValueSchema<typeof dynamicsCRMAuth>,
  entityName: string,
  AttributeName: string
): Promise<{ label: string; value: string | number }[]> {
  const request: HttpRequest = {
    method: HttpMethod.GET,
    url: `${auth.props?.['hostUrl']}/api/data/v9.2/EntityDefinitions(LogicalName=${entityName})/Attributes(LogicalName=${AttributeName})/Microsoft.Dynamics.CRM.PicklistAttributeMetadata`,
    queryParams: {
      $select: 'LogicalName',
      $exapnd: 'OptionSet($select=Options),GlobalOptionSet($select=Options)',
    },
    authentication: {
      type: AuthenticationType.BEARER_TOKEN,
      token: auth.access_token,
    },
    headers: {
      Accept: 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Content-Type': 'application/json',
    },
  };

  type Response = {
    '@odata.context': string;
    LogicalName: string;
    MetadataId: string;
    OptionSet: {
      MetadataId: string;
      Options: {
        Value: number;
        Label: {
          UserLocalizedLabel: {
            label: string;
            LanguageCode: number;
            IsManaged: boolean;
            MetadataId: string;
            HasChanged: boolean;
          };
        };
      }[];
    } | null;
    GlobalOptionSet: {
      MetadataId: string;
      Options: {
        Value: number;
        Label: {
          UserLocalizedLabel: {
            label: string;
            LanguageCode: number;
            IsManaged: boolean;
            MetadataId: string;
            HasChanged: boolean;
          };
        };
      }[];
    } | null;
  };

  const { body } = await httpClient.sendRequest<Response>(request);
  const optionSet = body.OptionSet ?? body.GlobalOptionSet;
  const options: { label: string; value: string | number }[] =
    optionSet?.Options?.map(({ Value, Label }) => ({
      value: Value,
      label: Label.UserLocalizedLabel.label ?? String(Value),
    })) || [];

  return options;
}
