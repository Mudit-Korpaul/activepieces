import { chatwithAuth } from '../../index';
import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod, httpClient } from '@activepieces/pieces-common';

export const askChatbot = createAction({
  auth: chatwithAuth,
  name: 'askChatbot',
  displayName: 'Ask Chatbot',
  description: 'Ask a query to chatbot.',
  props: {
    bot_id: Property.ShortText({
      displayName: 'Chatbot ID',
      description: 'UUID of the Chatbot to query.',
      required: true,
    }),
    message: Property.ShortText({
      displayName: 'Message',
      description: 'Message to send the bot.',
      required: true,
    }),
    conv_id: Property.ShortText({
      displayName: 'Conversation ID',
      description: 'Conversation ID, if any.',
      required: false,
    }),
    stream: Property.Checkbox({
      displayName: 'Stream',
      required: false,
      defaultValue: false
    }),
  },
  async run({ auth, propsValue }) {
    const { bot_id, message, conv_id, stream } = propsValue;
    
    const response = await httpClient.sendRequest({
      url: `https://api.chatwith.tools/v1/chatbot/${bot_id}/chat`,
      method: HttpMethod.POST,
      headers: {
        Authorization: `Bearer ${auth}`
      },
      body: conv_id === undefined ? {
        message: message,
        stream: stream
      } : {
        message: message,
        conversationId: conv_id,
        stream: stream
      },
    });
    return response.body;
  },
});
