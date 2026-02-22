// Main entry point for medusa-plugin-product-reviews
// This file is required for npm package resolution

export { default as ProductReviewModule } from "./modules/product-review"
export { PRODUCT_REVIEW_MODULE } from "./modules/product-review"

// Export admin routes configuration for Medusa auto-discovery

export const admin = {
  routes: [
    import("./admin/routes/reviews/page.js"),
  ],
}
