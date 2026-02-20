import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import { MODULE_KEY } from "../../types/product-review"

export type DeleteProductReviewStepInput = {
  review_id: string
}

export const deleteProductReviewStepId = "delete-product-review"

export const deleteProductReviewStep = createStep(
  deleteProductReviewStepId,
  async function (input: DeleteProductReviewStepInput, { container }) {
    const productReviewService: any = container.resolve(MODULE_KEY)

    const review = await productReviewService.retrieve(input.review_id)

    await productReviewService.delete(input.review_id)

    return new StepResponse(review, review)
  },
  async function (review: any, { container }) {
    if (!review) return
    const productReviewService: any = container.resolve(MODULE_KEY)
    await productReviewService.create(review)
  }
)
