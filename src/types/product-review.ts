import { IModuleService } from "@medusajs/types"

export const MODULE_KEY = "productReview"

export const MODULE_ID = "product-review"

export type CreateProductReviewDTO = {
  product_id: string
  customer_id: string | null
  rating: number
  title: string
  content: string
}

export type UpdateProductReviewDTO = {
  title?: string
  content?: string
  rating?: number
  status?: "pending" | "approved" | "rejected"
  rejection_reason?: string | null
  helpful_count?: number
  reported_count?: number
}

export type ProductReviewDTO = {
  id: string
  product_id: string
  customer_id: string | null
  rating: number
  title: string
  content: string
  status: "pending" | "approved" | "rejected"
  rejection_reason: string | null
  helpful_count: number
  reported_count: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export type CreateProductReviewImageDTO = {
  review_id: string
  url: string
  alt_text?: string
}

export type ProductReviewImageDTO = {
  id: string
  review_id: string
  url: string
  alt_text: string | null
  created_at: Date
}

export type CreateProductReviewRequestDTO = {
  product_id: string
  customer_id: string
}

export type ProductReviewRequestDTO = {
  id: string
  product_id: string
  customer_id: string
  requested_at: Date
  status: "pending" | "fulfilled"
}
