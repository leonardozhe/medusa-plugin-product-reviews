/**
 * Product Reviews Admin Menu Items
 * 
 * Menu configuration for the admin sidebar.
 * 
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */

export const productReviewsMenuItems = [
  {
    label: "Product Reviews",
    icon: "star",
    path: "/reviews",
    permissions: ["product_reviews.view"]
  }
]

export const productReviewRequestsMenuItems = [
  {
    label: "Review Requests",
    icon: "envelope",
    path: "/review-requests",
    permissions: ["product_review_requests.view"]
  }
]
