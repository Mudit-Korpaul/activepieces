export interface HeartbeatGroup {
  id: string;
  name: string;
}
export interface HeartbeatUser {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isAdmin: boolean;
  groups?: HeartbeatGroup[];
  bio?: string;
  avatar: string;
  createdAt: string;
}

export interface HeartbeatWebhookRequest {
  action: {
    name: string;
    filter?: Record<string, any>;
  };
  url: string;
}
export interface HeartbeatWebhookResponse {
  success: boolean;
  id: string;
}

export const enum HeartbeatWebhookType {
  USER_JOIN = 'USER_JOIN',
}
