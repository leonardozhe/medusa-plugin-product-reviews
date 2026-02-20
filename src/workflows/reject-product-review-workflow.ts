import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk"
import { rejectProductReviewStep } from "./steps/reject-product-review"
import type { RejectProductReviewStepInput } from "./steps/reject-product-review"

export type RejectProductReviewWorkflowInput = RejectProductReviewStepInput

export const rejectProductReviewWorkflow = createWorkflow(
  "reject-product-review-workflow",
  function (input: RejectProductReviewWorkflowInput) {
    const review = rejectProductReviewStep(input)

    return new WorkflowResponse(review)
  }
)
