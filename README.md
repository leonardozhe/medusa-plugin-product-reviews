# Medusa Smart Product Reviews Plugin

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Medusa Version](https://img.shields.io/badge/Medusa-2.13%2B-brightgreen.svg)](https://docs.medusajs.com/v2)

A modern product reviews plugin for Medusa v2.13+, designed to help you collect, moderate, and manage customer reviews effectively. Features star ratings, image uploads, moderation workflow, and seamless integration with Medusa's modular architecture.

## Features

- ⭐ **Star Rating System** - 1-5 star ratings for products
- 🔍 **Review Moderation** - Pending/approved/rejected workflow with reasons
- 📸 **Image Support** - Upload multiple images with reviews
- 📊 **Review Statistics** - Calculate average ratings and review counts
- 🔒 **Security** - Input validation and authentication checks
- 🚀 **Performance** - Optimized queries and efficient data models
- 🔄 **Modular Architecture** - Built with Medusa v2.13+ module system

## Installation

```bash
npm install git+https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git
```

## Configuration

### Step 1: Add Module to Config

Add the plugin as a module in your `medusa-config.ts`:

```typescript
import { defineConfig } from "@medusajs/framework"

export default defineConfig({
  modules: [
    // Keep your existing modules...
    
    // Add product reviews module
    {
      resolve: "medusa-plugin-smart-product-reviews",
    },
  ],
})
```

### Step 2: Run Migrations

The plugin uses Medusa's module system. After adding the module, run migrations to create the database tables:

```bash
npx medusa db:migrate
```

### Step 3: Restart Your Server

```bash
npm run dev
```

The module will be registered and ready to use.

## Data Models

### ProductReview

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `product_id` | string | Reference to product |
| `customer_id` | string | Reference to customer (optional) |
| `rating` | number | Star rating (1-5) |
| `title` | string | Review title |
| `content` | text | Review content |
| `status` | enum | pending | approved | rejected |
| `rejection`_reason` | string | Reason for rejection (optional) |
| `helpful_count` | number | Number of helpful votes |
| `reported_count` | number | Number of reports |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |
| `deleted_at` | datetime | Soft delete timestamp |

### ProductReviewImage

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `review_id` | string | Reference to review |
| `url` | string | Image URL |
| `alt_text` | string | Alt text for accessibility |
| `created_at` | datetime | Creation timestamp |

### ProductReviewRequest

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `product_id` | string | Reference to product |
| `customer_id` | string | Reference Reference to customer |
| `requested_at` | datetime | Request timestamp |
| `status` | enum | pending | fulfilled |

## Usage Examples

### Creating a Review (Store API)

```bash
POST /store/product_reviews
```

```json
{
  "product_id": "prod_123",
  "customer_id": "cust_456",
  "title": "Great product!",
  "content": "I really loved this product. The quality is amazing and it arrived quickly.",
  "rating": 5,
  "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

### Listing Reviews (Store API)

```bash
GET /store/product_reviews?product_id=prod_123
```

Only approved reviews are returned to the storefront.

### Approving a Review (Admin API)

```bash
POST /admin/product_reviews/:id/approve
```

### Rejecting a Review (Admin API)

```bash
POST /admin/product_reviews/:id/reject
```

```json
{
  "rejection_reason": "Contains inappropriate content"
}
```

### Listing All Reviews (Admin API)

```bash
GET /admin/product_reviews
```

## API Routes

### Store Routes

| Method | Route | Description | Authentication |
|--------|-------|-------------|----------------|
| `GET` | `/store/product_reviews` | List product reviews (approved only) | Public |
| `POST` | `/store/product_reviews` | Create a new review | Customer |
| `POST` | `/store/product_reviews/image_upload` | Upload review image | Customer |

### Admin Routes

| Method | Route | Description | Authentication |
|--------|-------|-------------|----------------|
| `GET` | `/admin/product_reviews` | List all reviews | Admin |
| `POST` | `/admin/product_reviews/:id/approve` | Approve a review | Admin |
| `POST` | `/admin/product_reviews/:id/reject` | Reject a review | Admin |
| `DELETE` | `/admin/product_reviews/:id` | Delete a review | Admin |
| `GET` | `/admin/product_review_requests` | List review requests | Admin |

## Architecture

Built with Medusa v2.13+ modular architecture:

```
API Routes → Workflows → Services → Data Models
```

- **Data Models**: Defined using `model.define()` from Medusa framework
- **Services**: Custom service classes for CRUD operations
- **Workflows**: Business logic with transaction support and rollback
- **API Routes**: HTTP endpoints with Zod validation
- **Module Links**: Relationships to Product and Customer modules

## Development

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/leonardozhe/medusa-plugin-smart-product-reviews.git
cd medusa-plugin-smart-product-reviews
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Copyright (c) 2025 leonardozhe

Licensed under MIT License. See [LICENSE](LICENSE) for details.

## Support

- **GitHub**: [https://github.com/leonardozhe/medusa-plugin-smart-product-reviews](https://github.com/leonardozhe/medusa-plugin-smart-product-reviews)
- **Issues**: [https://github.com/leonardozhe/medusa-plugin-smart-product-reviews/issues](https://github.com/leonardozhe/medusa-plugin-smart-product-reviews/issues)

## Version History

### v1.0.0

- Initial release for Medusa v2.13+
- Complete module-based architecture
- Star rating system (1-5)
- Review moderation workflow
- Image upload support
- Basic admin API endpoints
