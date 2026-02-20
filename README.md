# Medusa Product Reviews Plugin

A complete product review plugin for Medusa 2.13, supporting review creation, moderation, and management.

## Features

- ✅ Product review creation (requires customer authentication)
- ✅ Review moderation (admin approve/reject)
- ✅ Review deletion (via workflow compensation)
- ✅ Admin review list management page
- ✅ Store API to fetch approved product reviews
- ✅ Review average rating calculation

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/leonardozhe/medusa-plugin-product-reviews.git
cd medusa-plugin-product-reviews
```

### Step 2: Copy files to your Medusa project

Copy the entire `src` directory to your Medusa project:

```bash
cp -r src/ /path/to/your/medusa/project/src/
```

### Step 3: Configure medusa-config.ts

Add the module configuration in your `medusa-config.ts`:

```typescript
module.exports = defineConfig({
  // ...
  modules: [
    // ... other modules
    {
      resolve: "./src/modules/product-review",
    },
  ],
})
```

### Step 4: Generate and run database migrations

```bash
# Using npm
npx medusa db:generate productReview
npm run db:migrate

# Using yarn
npx medusa db:generate productReview
yarn db:migrate

# Using pnpm
npx medusa db:generate productReview
pnpm db:migrate
```

**Note**: If `db:migrate` is not available in your scripts, use:

```bash
npx medusa db:migrate
```

### Step 5: Restart your Medusa server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

## API Routes

### Store API

#### POST /store/reviews

Create a product review (requires customer authentication)

**Request Headers**:
- `x-publishable-api-key`: Publishable API Key
- `Authorization`: Bearer Token (customer session token)

**Request Body**:
```json
{
  "title": "string (optional)",
  "content": "string (required)",
  "rating": "number (1-5, required)",
  "product_id": "string (required)",
  "first_name": "string (required)",
  "last_name": "string (required)"
}
```

**Response**:
```json
{
  "review": {
    "id": "string",
    "title": "string",
    "content": "string",
    "rating": 5,
    "product_id": "string",
    "customer_id": "string",
    "status": "pending",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /store/products/:id/reviews

Fetch approved reviews for a specific product

**Request Headers**:
- `x-publishable-api-key`: Publishable API Key

**Query Parameters**:
- `limit`: Number of items per page (default: 10)
- `offset`: Number of items to skip (default: 0)
- `order`: Sort order (default: -created_at)

**Response**:
```json
{
  "reviews": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "rating": 5,
      "first_name": "string",
      "last_name": "string",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 100,
  "limit": 10,
  "offset": 0,
  "average_rating": 4.5
}
```

### Admin API

#### GET /admin/reviews

Fetch all reviews (requires admin authentication)

**Request Headers**:
- `Authorization`: Bearer Token (admin session token)

**Query Parameters**:
- `limit`: Number of items per page (default: 20)
- `offset`: Number of items to skip (default: 0)
- `order`: Sort order (default: -created_at)

**Response**:
```json
{
  "reviews": [...],
  "count": 100,
  "limit": 20,
  "offset": 0
}
```

#### POST /admin/reviews/status

Approve or reject reviews (batch operation)

**Request Headers**:
- `Authorization`: Bearer Token (admin session token)

**Request Body**:
```json
{
  "ids": ["review_id_1", "review_id_2"],
  "status": "approved"
}
```

**Status Options**: `pending` | `approved` | `rejected`

## Data Model

### Review

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (primary key) |
| title | string? | Review title (optional) |
| content | string | Review content (required) |
| rating | number | Rating (1-5, with constraint) |
| first_name | string | Reviewer first name |
| last_name | string | Reviewer last name |
| status | enum | Status: pending/approved/rejected |
| product_id | string | Associated product ID (indexed) |
| customer_id | string? | Customer ID (optional) |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Update timestamp |

## File Structure

```
src/
├── modules/
│   └── product-review/
│       ├── models/
│       │   └── review.ts
│       ├── service.ts
│       └── index.ts
├── links/
│   └── review-product.ts
├── workflows/
│   ├── create-review.ts
│   ├── update-review.ts
│   └── steps/
│       ├── create-review.ts
│       └── update-review.ts
├── api/
│   ├── store/
│   │   ├── reviews/route.ts
│   │   └── products/[id]/reviews/route.ts
│   ├── admin/
│   │   ├── reviews/route.ts
│   │   └── reviews/status/route.ts
│   └── middlewares.ts
└── admin/
    ├── lib/sdk.ts
    └── routes/reviews/page.tsx
```

## Testing

### 1. Create a test customer

```bash
# Get registration token
curl -X POST 'http://localhost:9000/auth/customer/emailpass/register' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Register customer
curl -X POST 'http://localhost:9000/store/customers' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -H 'x-publishable-api-key: {api_key}' \
  --data-raw '{
    "email": "test@example.com"
  }'

# Get auth token
curl -X POST 'http://localhost:9000/auth/customer/emailpass' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Create a review

```bash
curl --location 'http://localhost:9000/store/reviews' \
  --header 'x-publishable-api-key: {api_key}' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {token}' \
  --data '{
    "product_id": "{product_id}",
    "title": "Really good",
    "content": "The material is nice",
    "rating": 5,
    "first_name": "John",
    "last_name": "Smith"
  }'
```

### 3. Admin moderate review

```bash
curl -X POST 'http://localhost:9000/admin/reviews/status' \
  -H 'Authorization: Bearer {admin_token}' \
  -H 'Content-Type: application/json' \
  --data '{
    "ids": ["{review_id}"],
    "status": "approved"
  }'
```

## License

MIT

## GitHub Repository

https://github.com/leonardozhe/medusa-plugin-product-reviews
