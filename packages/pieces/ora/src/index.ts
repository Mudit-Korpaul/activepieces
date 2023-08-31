
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const ora = createPiece({
  displayName: "Ora",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/ora.png",
  authors: [],
  actions: [],
  triggers: [],
});
