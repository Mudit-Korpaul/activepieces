export const EntityDetails: {
  [key: string]: {
    displayName: string;
    value: string;
    urlPath: string;
    primaryKey: string;
    primaryNameAttribute: string;
  };
} = {
  account: {
    displayName: 'Account',
    value: 'account',
    urlPath: 'accounts',
    primaryKey: 'accountid',
    primaryNameAttribute: 'name',
  },
};

export const enum EntityAttributeType {
  PICKLIST = 'Picklist',
  VIRTUAL = 'Virtual',
  UNIQUE_IDENTIFIER = 'Uniqueidentifier',
  STRING = 'String',
  MEMO = 'Memo',
  MONEY = 'Money',
  DOUBLE = 'Double',
  INTEGER = 'Integer',
  LOOKUP = 'Lookup',
  DATETIME = 'DateTime',
  BOOLEAN = 'Boolean',
  BIGINT = 'BigInt',
  DECIMAL = 'Decimal',
  OWNER = 'Owner',
  ENTITY_NAME = 'EntityName',
  STATE = 'State',
}
