import { createAction } from '@activepieces/pieces-framework';
import { Property } from '@activepieces/pieces-framework';
import { heartbeatAuth } from '../../';
import { heartbeatCommon, makeClient, richTextProcessor } from '../common';

export const sendDirectMessageAction = createAction({
  auth: heartbeatAuth,
  name: 'send_direct_message',
  displayName: 'Send Direct Message',
  description: 'Send a direct message in Heartbeat community.',
  props: {
    text: Property.LongText({
      displayName: 'Message',
      description:
        'The content that will be created in the thread.The following HTML tags can be used: <p>, <a>, <b>, <h1>, <h2>, <h3>, <ul>, <li>, <br>. Invalid HTML will be removed. Any HTML attributes will be discarded except for the href attribute on <a> tags.',
      required: true,
      processors: [richTextProcessor],
    }),
    receiverId: heartbeatCommon.userId(
      'Receiver',
      'The user that the direct message will be sent to.',
      true
    ),
    senderId: heartbeatCommon.userId(
      'Sender',
      'Only an admin user can be chosen. If this field is not provided, the user that created the API key will be used.',
      false
    ),
  },
  async run(context) {
    const { text, receiverId, senderId } = context.propsValue;
    const client = makeClient(context.auth as string);
    return await client.sendDirectMessage(
      text as string,
      receiverId as string,
      senderId as string
    );
  },
});
