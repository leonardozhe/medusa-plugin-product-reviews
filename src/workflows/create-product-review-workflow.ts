import { createWorkflow, WorkflowResponse } from "@medusajs/workflows-sdk"
import { createProductReviewStep } from "./steps/create-product-review"
import type { CreateProductReviewStepInput } from "./steps/create-product-review"

export type CreateProductReviewWorkflowInput = CreateProductReviewStepInput

export const createProductReviewWorkflow = createWorkflow(
  "create-product-review-workflow",
  function (input: CreateProductReviewWorkflowInput) {
    const review = createProductReviewStep(input)

    return new WorkflowResponse(review)
  }
)
