import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk"
import { approveProductReviewStep } from "./steps/approve-product-review"
import type { ApproveProductReviewStepInput } from "./steps/approve-product-review"

export type ApproveProductReviewWorkflowInput = ApproveProductReviewStepInput

export const approveProductReviewWorkflow = createWorkflow(
  "approve-product-review-workflow",
  function (input: ApproveProductReviewWorkflowInput) {
    const review = approveProductReviewStep(input)

    return new WorkflowResponse(review)
  }
)
