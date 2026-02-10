import {
  ProductReviewService,
  ProductReviewImageService,
  ProductReviewRequestService
} from "./services"
import {
  ProductReviewRepository,
  ProductReviewRequestRepository
} from "./repositories"

/**
 * Product Reviews Module
 *
 * This module provides product reviews functionality for Medusa v2.
 * It includes services for managing reviews, review images, and review requests.
 *
 * @module product-reviews
 * @author Lambda Curry <team@lambdacurry.dev>
 * @author Modified for Medusa 2.13 compatibility by leonardozhe
 */
export default {
  id: "product-reviews",
  description: "Product reviews module for Medusa v2",
  services: [
    ProductReviewService,
    ProductReviewImageService,
    ProductReviewRequestService
  ],
  repositories: [
    ProductReviewRepository,
    ProductReviewRequestRepository
  ],
  migrations: [],
  load: async ({ container }) => {
    // Register services in the container
    container.register("productReviewService", ProductReviewService)
    container.register("productReviewImageService", ProductReviewImageService)
    container.register("productReviewRequestService", ProductReviewRequestService)
    
    // Register repositories
    container.register("productReviewRepository", ProductReviewRepository)
    container.register("productReviewRequestRepository", ProductReviewRequestRepository)
  }
} as const
