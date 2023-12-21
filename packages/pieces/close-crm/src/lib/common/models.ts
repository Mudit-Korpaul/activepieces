export type WebhookCreateRequest = {
  url: string;
  events: {
    object_type: string;
    action: string;
  }[];
};
export interface WebhookInformation {
  id: string;
  url: string;
  verfiy_ssl: boolean;
  created_by: string;
  date_created: string;
  date_updated: string;
  updated_by: string;
  status: string;
  signature_key: string;
  events: {
    action: CloseCRMEventActionType;
    object_type: CloseCRMEventObjectType;
  };
}
export const enum CloseCRMEventObjectType {
  LEAD = 'lead',
  CONTACT = 'contact',
  OPPORTUNITY = 'opportunity',
  //   TASKS = 'tasks',
  EMAIL = 'activity.email',
  EMAIL_THREAD = 'activity.email_thread',
  CALL = 'activity.call',
  SMS = 'activity.sms',
  NOTE = 'activity.note',
  MEETING = 'activity.meeting',
  LEAD_STATUS_CHANGE = 'activity.lead_status_change',
  OPPORTUNITY_STATUS_CHANGE = 'activity.opportunity_status_change',
  TASK_COMPLETED = 'activity.task_completed',
  IMPORT = 'import',
}

export const enum CloseCRMEventActionType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  MERGED = 'merged',
  COMPLETED = 'completed',
}
