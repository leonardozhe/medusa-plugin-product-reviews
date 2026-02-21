import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import ProductReviewModuleService from "../../../../modules/product-review/service"

export const GetStoreReviewsSchema = createFindParams()

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params

  const query = req.scope.resolve(Modules.QUERY)
  const reviewModuleService: ProductReviewModuleService = req.scope.resolve("productReviewModuleService")

  // Get reviews for product
  const { data: reviews, metadata: {
    count,
    take,
    skip,
  } = { count: 0, take: 10, skip: 0 } } = await query.graph({
    entity: "review",
    filters: {
      product_id: id,
      status: "approved",
    },
    ...req.queryConfig,
  })

  res.json({
    reviews,
    count,
    limit: take,
    offset: skip,
    average_rating: await reviewModuleService.getAverageRating(id),
  })
}
