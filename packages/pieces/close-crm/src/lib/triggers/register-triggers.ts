import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { closeCrmAuth } from '../../';
import {
  CloseCRMEventActionType,
  CloseCRMEventObjectType,
  WebhookInformation,
} from '../common/models';
import { makeClient } from '../common';

export const closeCRMRegisterTrigger = ({
  name,
  displayName,
  description,
  objectType,
  actionType,
  sampleData,
}: {
  name: string;
  displayName: string;
  description: string;
  objectType: CloseCRMEventObjectType;
  actionType: CloseCRMEventActionType;
  sampleData: unknown;
}) =>
  createTrigger({
    auth: closeCrmAuth,
    name: `close_trigger_${name}`,
    displayName,
    description,
    props: {},
    type: TriggerStrategy.WEBHOOK,
    sampleData: sampleData,
    async onEnable(context) {
      const client = makeClient(context.auth as string);
      const response = await client.subscribeWebhook({
        url: context.webhookUrl,
        events: [
          {
            object_type: objectType,
            action: actionType,
          },
        ],
      });
      await context.store.put<WebhookInformation>(
        `close_${name}_trigger`,
        response.body
      );
    },
    async onDisable(context) {
      const webhook = await context.store.get<WebhookInformation>(
        `close_${name}_trigger`
      );
      if (webhook != null) {
        const client = makeClient(context.auth as string);
        await client.unsubscribeWebhook(webhook.id);
      }
    },
    async run(context) {
      return [context.payload.body];
    },
    async test(context) {
      return [context.payload.body];
    },
  });
