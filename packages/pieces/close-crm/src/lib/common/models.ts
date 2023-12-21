export type WebhookCreateRequest = {
  url: string;
  events: {
    object_type: string;
    action: string;
  }[];
};
