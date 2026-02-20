import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk"
import { deleteProductReviewStep } from "./steps/delete-product-review"
import type { DeleteProductReviewStepInput } from "./steps/delete-product-review"

export type DeleteProductReviewWorkflowInput = DeleteProductReviewStepInput

export const deleteProductReviewWorkflow = createWorkflow(
  "delete-product-review-workflow",
  function (input: DeleteProductReviewWorkflowInput) {
    const review = deleteProductReviewStep(input)

    return new WorkflowResponse(review)
  }
)
