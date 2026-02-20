import { MedusaService } from "@medusajs/framework/utils"
import ProductReview from "../models/product-review"
import ProductReviewImage from "../models/product-review-image"
import ProductReviewRequest from "../models/product-review-request"

class ProductReviewService extends MedusaService({
  ProductReview,
  ProductReviewImage,
  ProductReviewRequest,
}) {}

export default ProductReviewService
