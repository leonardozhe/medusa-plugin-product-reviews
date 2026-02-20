import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import { MODULE_KEY } from "../../types/product-review"

export type CreateProductReviewStepInput = {
  product_id: string
  customer_id: string | null
  rating: number
  title: string
  content: string
}

export const createProductReviewStepId = "create-product-review"

export const createProductReviewStep = createStep(
  createProductReviewStepId,
  async function (input: CreateProductReviewStepInput, { container }) {
    const productReviewService: any = container.resolve(MODULE_KEY)

    const review = await productReviewService.create({
      product_id: input.product_id,
      customer_id: input.customer_id,
      rating: input.rating,
      title: input.title,
      content: input.content,
      status: "pending",
      helpful_count: 0,
      reported_count: 0,
    })

    return new StepResponse(review, review.id)
  },
  async function (reviewId: string | undefined, { container }) {
    if (!reviewId) return

    const productReviewService: any = container.resolve(MODULE_KEY)
    await productReviewService.delete(reviewId)
  }
)
