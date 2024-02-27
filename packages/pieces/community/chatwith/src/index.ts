import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { askChatbot } from "./lib/actions/ask-chatbot";
import { chatbotAction } from "./lib/triggers/chatbot-action";

export const chatwithAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: 'Go to the Account section in Chatwith dashboard.\n \nScroll down to API Key and copy paste the API Key here ;)',
});

export const chatwith = createPiece({
  displayName: "Chatwith",
  auth: chatwithAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: "https://chatwith.tools/_next/static/media/icon.84f4bc85.svg",
  authors: [],
  actions: [askChatbot],
  triggers: [chatbotAction],
});