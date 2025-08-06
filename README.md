# CluckCommerce

A modern e-commerce platform for a chicken farm, built with Next.js 15 and Firebase. CluckCommerce enables customers to purchase fresh farm products including eggs, slaughtered chicken meat, and live chickens.

## 🐔 Features

- **Product Catalog**: Browse fresh eggs, slaughtered chicken cuts, and live chickens
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout Process**: Complete purchase flow with order confirmation
- **Live Farm Stats**: Real-time updates on farm operations
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **AI Integration**: Powered by Google AI for enhanced user experience

## 🛍️ Product Categories

- **Fresh Eggs**: Dozen, half-dozen, and tray options
- **Slaughtered Meat**: Whole chickens, breasts, and thighs
- **Live Chickens**: Laying hens and roosters for backyard flocks

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with shadcn/ui
- **Backend**: Firebase for data and authentication
- **AI**: Google AI integration via Genkit
- **Deployment**: Firebase Hosting ready

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.jsx           # Homepage with featured products
│   ├── products/          # Product catalog and detail pages
│   ├── cart/              # Shopping cart functionality
│   ├── checkout/          # Checkout process
│   └── order-confirmation/ # Order confirmation page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── product-card.jsx  # Product display component
│   ├── live-stats.jsx    # Real-time farm statistics
│   └── add-to-cart-button.jsx # Cart interaction
├── lib/                  # Utility functions and data
│   ├── products.js       # Product data and functions
│   ├── types.js          # TypeScript type definitions
│   └── utils.js          # Helper utilities
├── hooks/                # Custom React hooks
└── ai/                   # AI integration files
```

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🌟 Key Features

- **Farm-to-Table Experience**: Direct connection between farm and customers
- **Freshness Tracking**: Real-time updates on product availability
- **Ethical Farming**: Transparent sourcing and humane practices
- **Local Delivery**: Community-focused distribution model

---

*"From Coop to Kitchen — Fresh, Local, and Delivered with Care."*
