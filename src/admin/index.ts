/**
 * Product Reviews Admin Extension
 *
 * Provides admin UI components for managing product reviews.
 * Compatible with Medusa v2 Admin SDK.
 *
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */

import { productReviewsRoute, productReviewRequestsRoute } from "./routes"

export default {
  id: "product-reviews-admin",
  label: "Product Reviews",
  routes: [
    {
      path: "/reviews",
      label: "Product Reviews",
      component: productReviewsRoute
    },
    {
      path: "/review-requests",
      label: "Review Requests",
      component: productReviewRequestsRoute
    }
  ],
  menuItems: [
    {
      label: "Product Reviews",
      path: "/reviews",
      icon: "Stars"
    },
    {
      label: "Review Requests",
      path: "/review-requests",
      icon: "Envelope"
    }
  ]
}
