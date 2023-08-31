
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const pinterest = createPiece({
  displayName: "Pinterest",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/pinterest.png",
  authors: [],
  actions: [],
  triggers: [],
});
