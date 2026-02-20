import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import { MODULE_KEY } from "../../types/product-review"

export type RejectProductReviewStepInput = {
  review_id: string
  rejection_reason: string
}

export const rejectProductReviewStepId = "reject-product-review"

export const rejectProductReviewStep = createStep(
  rejectProductReviewStepId,
  async function (input: RejectProductReviewStepInput, { container }) {
    const productReviewService: any = container.resolve(MODULE_KEY)

    const review = await productReviewService.retrieve(input.review_id)

    await productReviewService.update(input.review_id, {
      status: "rejected",
      rejection_reason: input.rejection_reason,
    })

    return new StepResponse({ review, previousStatus: review.status, previousReason: review.rejection_reason })
  },
  async function (data: { review: any; previousStatus: string; previousReason: string | null } | undefined, { container }) {
    if (!data) return
    const productReviewService: any = container.resolve(MODULE_KEY)
    await productReviewService.update(data!.review.id, {
      status: data!.previousStatus,
      rejection_reason: data!.previousReason,
    })
  }
)
