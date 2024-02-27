
import { chatwithAuth } from '../../index';
import { createTrigger, Property, TriggerStrategy } from '@activepieces/pieces-framework';

const markdown = `
- Go to the "Dashboard" section.
- Select the form where you want the trigger to occur.
- Click on "Integrations" section.
- Find "Webhooks" integration and click on "connect" to activate it.
- In the webhook settings, paste this URL: 
  \`{{webhookUrl}}\`
- Click on "Submit".
`;

export const chatbotAction = createTrigger({
    // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
    auth: chatwithAuth,
    name: 'chatbotAction',
    displayName: 'Chatbot Action',
    description: 'Triggers when Chatbot Action is called',
    props: {
        md: Property.MarkDown({
            value: markdown,
        }),
    },
    sampleData: {},
    type: TriggerStrategy.WEBHOOK,
    async onEnable(){
        // empty
    },
    async onDisable(){
        // empty
    },
    async run(context) {
        console.log(context.webhookUrl);
        return [context.payload];
      },
    async test(context) {
        console.log(context.webhookUrl);
       return [context.payload];
    },
})