import {
  CloseCRMEventActionType,
  CloseCRMEventObjectType,
} from '../common/models';
import { closeCRMRegisterTrigger } from './register-triggers';

export const closeCRMTriggers = [
  {
    name: 'contact_created',
    objectType: CloseCRMEventObjectType.CONTACT,
    actionType: CloseCRMEventActionType.CREATED,
    displayName: 'New Contact',
    description: 'Triggers when a new contact is created.',
    sampleData: {
      subscription_id: 'whsub_6usRVHAOQ5K3fAlLhpjsnY',
      event: {
        id: 'ev_4cDykiSaoCzRbUmOagdCaS',
        date_created: '2023-12-21T08:19:50.126000',
        date_updated: '2023-12-21T08:19:50.126000',
        organization_id: 'orga_iOig3642mch0b1g4gCfUcBFCr6vTYPWL0sv6Ha0Oega',
        user_id: 'user_94CAFT9HCW4yL04SSqBBqRjpuWVZpC7McjIYJHDOVn0',
        request_id: 'req_1kXHKuGrwrPky3WjxsqbUg',
        api_key_id: null,
        oauth_client_id: null,
        oauth_scope: null,
        object_type: 'contact',
        object_id: 'cont_ZQJaqkAeTqE7N8r0q1McC889kcgT5t2gFf2dgXhUa6h',
        lead_id: 'lead_U8DdS0WNOMCYzU4U0PodUNFl2NkO4ghKeQM6gyttDtm',
        action: 'created',
        changed_fields: [],
        meta: { request_path: '/api/v1/lead/', request_method: 'POST' },
        data: {
          id: 'cont_ZQJaqkAeTqE7N8r0q1McC889kcgT5t2gFf2dgXhUa6h',
          organization_id: 'orga_iOig3642mch0b1g4gCfUcBFCr6vTYPWL0sv6Ha0Oega',
          updated_by: 'user_94CAFT9HCW4yL04SSqBBqRjpuWVZpC7McjIYJHDOVn0',
          name: 'Kishan Parmar',
          title: '',
          date_created: '2023-12-21T08:19:50.124000+00:00',
          date_updated: '2023-12-21T08:19:50.124000+00:00',
          created_by: 'user_94CAFT9HCW4yL04SSqBBqRjpuWVZpC7McjIYJHDOVn0',
          lead_id: 'lead_U8DdS0WNOMCYzU4U0PodUNFl2NkO4ghKeQM6gyttDtm',
          urls: [],
          emails: [],
          phones: [],
        },
        previous_data: {},
      },
    },
  },
].map((props) => closeCRMRegisterTrigger(props));
