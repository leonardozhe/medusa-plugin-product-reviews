# Medusa Plugin Product Reviews

A plugin that enables customer product reviews for Medusa v2.13+.

## Installation

```bash
yarn add @leonardozhe/medusa-plugin-product-reviews
```

## Configuration

Add to your `medusa-config.ts`:

```ts
import { defineConfig } from "@medusajs/framework/utils"

export default defineConfig({
  modules: [
    {
      resolve: "@leonardozhe/medusa-plugin-product-reviews",
      options: {
        auto_approve: false,
        max_images: 5
      }
    }
  ],
  // Admin UI is automatically loaded via module.ts adminUi field
  // No need for admin.extensions configuration
})
```

Run migrations:

```bash
npx medusa db:migrate
```

## API Routes

### Admin
- `GET /admin/product-reviews` - List all reviews
- `POST /admin/product-reviews/:id/approve` - Approve a review
- `POST /admin/product-reviews/:id/reject` - Reject a review
- `DELETE /admin/product-reviews/:id` - Delete a review
- `GET /admin/product-review-requests` - List review requests

### Store
- `GET /store/product-reviews` - List product reviews (only approved reviews)
- `POST /store/product-reviews` - Create a review (status defaults to "pending")
- `POST /store/product-review-image-upload` - Upload review image

## Review Moderation

Reviews are created with status "pending" by default. Only approved reviews are shown on the storefront. Use the admin panel to approve or reject reviews.

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `auto_approve` | boolean | false | Automatically approve new reviews |
| `max_images` | number | 5 | Maximum images per review |

## License

MIT

## Repository

https://github.com/leonardozhe/medusa-plugin-product-reviews

---

Original author: Lambda Curry <team@lambdacurry.dev>
