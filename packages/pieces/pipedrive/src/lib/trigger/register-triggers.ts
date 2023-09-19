import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { pipedriveAuth } from '../../';
import { makeClient } from '../common/client';
import {
  WebhookInformation,
  PipedriveEventAction,
  PipedriveEventObject,
} from '../common/models';
export const pipedriveRegisterTrigger = ({
  name,
  displayName,
  description,
  eventObject,
  eventAction,
  sampleData,
}: {
  name: string;
  displayName: string;
  description: string;
  eventObject: PipedriveEventObject;
  eventAction: PipedriveEventAction;
  sampleData: unknown;
}) =>
  createTrigger({
    auth: pipedriveAuth,
    name: `pipedrive_trigger_${name}`,
    displayName,
    description,
    props: {},
    sampleData,
    type: TriggerStrategy.WEBHOOK,
    async onEnable({ auth, store, webhookUrl }) {
      const client = makeClient({ auth });
      const webhook = await client.subscribeWebhook({
        subscription_url: webhookUrl!,
        event_action: eventAction,
        event_object: eventObject,
      });
      await store?.put<WebhookInformation>(`pipedrive_${name}_trigger`, {
        webhookId: webhook.data.id,
      });
    },
    async onDisable({ store, auth }) {
      const response = await store?.get<WebhookInformation>(
        `pipedrive_${name}_trigger`
      );
      if (response !== null && response !== undefined) {
        const client = makeClient({ auth });
        await client.unsubscribeWebhook(response.webhookId);
      }
    },
    async run(context) {
      return [context.payload.body.current];
    },
  });
