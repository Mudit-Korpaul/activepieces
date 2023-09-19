export interface WebhookRequest {
  subscription_url: string;
  event_action: string;
  event_object: string;
  user_id?: number;
  http_auth_user?: string;
  http_auth_password?: string;
  version?: string;
}
export interface WebhookInformation {
  webhookId: string;
}

export const enum PipedriveEventAction {
  ADDED = 'added',
  UPDATED = 'updated',
  MERGED = 'merged',
  DELETED = 'deleted',
  ALL = '*',
}

export const enum PipedriveEventObject {
  ACTIVITY = 'activity',
  ACTIVITY_TYPE = 'activityType',
  DEAL = 'deal',
  NOTE = 'note',
  ORGANIZATION = 'organization',
  PERSON = 'person',
  PIPELINE = 'pipeline',
  PRODUCT = 'product',
  STAGE = 'stage',
  USER = 'user',
  ALL = '*',
}

export interface PipedriveUser {
  id: string;
  name: string;
}

export interface PipedriveOrganization {
  id: string;
  name: string;
}

export interface OrganizationListRequest {
  user_id?: number;
  filter_id?: number;
  first_char?: string;
  start?: number;
  limit?: number;
  sort?: string;
}

export interface PersonCreateRequest {
  name: string;
  owner_id?: number;
  org_id?: number;
  email?: string;
  phone?: string;
  visible_to?: string;
  marketing_status?: string;
  add_time?: string;
}
