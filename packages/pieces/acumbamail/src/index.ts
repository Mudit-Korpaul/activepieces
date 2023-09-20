
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const acumbamail = createPiece({
  displayName: "Acumbamail",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/acumbamail.png",
  authors: [],
  actions: [],
  triggers: [],
});
