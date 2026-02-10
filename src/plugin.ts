import apiRouter from "./api"

/**
 * Product Reviews Plugin for Medusa v2
 *
 * Compatible with Medusa 2.13+
 *
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export default function (rootDirectory: string, options: Record<string, unknown> = {}) {
  // Export API routes for Medusa v2
  return {
    id: "@lambdacurry/medusa-plugin-product-reviews",
    name: "Product Reviews Plugin",
    description: "Enable customer product reviews for your Medusa store. Compatible with Medusa v2.13+.",
    version: "0.0.23",
    api: apiRouter(rootDirectory),
    options
  }
}
