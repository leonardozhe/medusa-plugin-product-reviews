/**
 * Product Reviews Admin Extension
 *
 * Provides admin UI components for managing product reviews.
 * Compatible with Medusa v2 Admin SDK.
 *
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export default {
  id: "product-reviews-admin",
  label: "Product Reviews",
  
  // Widget definitions for product details page
  widgets: {
    "product.details.after": {
      component: () => import("./widgets").then(m => m.ProductReviewsWidget)
    }
  },

  // Custom routes
  routes: [
    {
      path: "/reviews",
      component: () => import("./routes").then(m => m.ProductReviewsPage)
    },
    {
      path: "/review-requests",
      component: () => import("./routes").then(m => m.ProductReviewRequestsPage)
    }
  ],

  // Menu items
  menuItems: [
    {
      label: "Product Reviews",
      path: "/reviews",
      icon: "star"
    },
    {
      label: "Review Requests",
      path: "/review-requests",
      icon: "envelope"
    }
  ]
}
