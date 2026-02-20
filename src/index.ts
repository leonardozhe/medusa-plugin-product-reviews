import moduleDefinition from "./module"

// Export models
export { default as ProductReview } from "./models/product-review"
export { default as ProductReviewImage } from "./models/product-review-image"
export { default as ProductReviewRequest } from "./models/product-review-request"

// Export types
export type {
  ProductReviewDTO,
  CreateProductReviewDTO,
  UpdateProductReviewDTO,
  ProductReviewImageDTO,
  CreateProductReviewImageDTO,
  ProductReviewRequestDTO,
  CreateProductReviewRequestDTO,
} from "./types/product-review"

export { MODULE_KEY, MODULE_ID } from "./types/product-review"

// Export workflows
export {
  createProductReviewWorkflow,
  type CreateProductReviewWorkflowInput,
} from "./workflows/create-product-review-workflow"

export {
  approveProductReviewWorkflow,
  type ApproveProductReviewWorkflowInput,
} from "./workflows/approve-product-review-workflow"

export {
  rejectProductReviewWorkflow,
  type RejectProductReviewWorkflowInput,
} from "./workflows/reject-product-review-workflow"

export {
  deleteProductReviewWorkflow,
  type DeleteProductReviewWorkflowInput,
} from "./workflows/delete-product-review-workflow"

// Export workflow steps
export {
  createProductReviewStep,
  createProductReviewStepId,
  type CreateProductReviewStepInput,
} from "./workflows/steps/create-product-review"

export {
  approveProductReviewStep,
  approveProductReviewStepId,
  type ApproveProductReviewStepInput,
} from "./workflows/steps/approve-product-review"

export {
  rejectProductReviewStep,
  rejectProductReviewStepId,
  type RejectProductReviewStepInput,
} from "./workflows/steps/reject-product-review"

export {
  deleteProductReviewStep,
  deleteProductReviewStepId,
  type DeleteProductReviewStepInput,
} from "./workflows/steps/delete-product-review"

// Default export for plugin registration
export default moduleDefinition
