import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import { MODULE_KEY } from "../../types/product-review"

export type ApproveProductReviewStepInput = {
  review_id: string
}

export const approveProductReviewStepId = "approve-product-review"

export const approveProductReviewStep = createStep(
  approveProductReviewStepId,
  async function (input: ApproveProductReviewStepInput, { container }) {
    const productReviewService: any = container.resolve(MODULE_KEY)

    const review = await productReviewService.retrieve(input.review_id)

    await productReviewService.update(input.review_id, {
      status: "approved",
    })

    return new StepResponse({ review, previousStatus: review.status })
  },
  async function (data: { review: any; previousStatus: string } | undefined, { container }) {
    if (!data) return
    const productReviewService: any = container.resolve(MODULE_KEY)
    await productReviewService.update(data!.review.id, {
      status: data!.previousStatus,
    })
  }
)
