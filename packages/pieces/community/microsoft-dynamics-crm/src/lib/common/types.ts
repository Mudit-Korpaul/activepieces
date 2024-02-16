import { EntityAttributeType } from './constants';

export type EntityAttributeResponse = {
  '@odata.context': string;
  value: {
    '@odata.type': string;
    AttributeType: EntityAttributeType;
    LogicalName: string;
    MetadataId: string;
    Description: {
      UserLocalizedLabel: {
        label: string;
        LanguageCode: number;
        IsManaged: boolean;
        MetadataId: string;
        HasChanged: boolean;
      };
    } | null;
    DisplayName: {
      UserLocalizedLabel: {
        label: string;
        LanguageCode: number;
        IsManaged: boolean;
        MetadataId: string;
        HasChanged: boolean;
      };
    } | null;
  }[];
};
