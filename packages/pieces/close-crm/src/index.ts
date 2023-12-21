
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const closeCrm = createPiece({
  displayName: "Close-crm",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://cdn.activepieces.com/pieces/close-crm.png",
  authors: [],
  actions: [],
  triggers: [],
});
