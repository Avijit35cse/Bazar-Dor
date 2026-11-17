# বাজার দর | BazarDor

### Everyday market prices. Clear insights. Smarter shopping.

BazarDor is a Bengali-first market price tracking platform designed to help people explore essential grocery prices, compare market rates, and understand daily price movements — all in one place.

Built with a mobile-first approach, BazarDor makes market information easier to access through a clean interface, localized Bengali typography, and intuitive navigation.

<p align="center">
  <a href="https://bazar-dor-b14.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Website-Visit%20BazarDor-16834A?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website" />
  </a>
  <a href="https://github.com/Avijit35cse/Bazar-Dor">
    <img src="https://img.shields.io/badge/GitHub-Source%20Code-24292F?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
</p>

---

## Live Preview

**Website:** https://bazar-dor-b14.vercel.app

![BazarDor Homepage](./public/bazar-hero.png)

---

## About the Project

Understanding everyday market prices can be difficult when information is scattered across different sources.

BazarDor brings essential market information together in a single dashboard. Users can explore products, browse categories, compare prices across regional markets, and review price movements through a Bengali-first interface.

The platform focuses on three key questions:

- What is the current price of an essential product?
- How has its price changed over time?
- How do prices compare across different markets?

The experience is designed to be straightforward, responsive, and accessible across desktop, tablet, and mobile devices.

---

## Key Features

- **Market Price Overview:** Explore prices of essential products, including rice, lentils, oil, vegetables, fish, meat, eggs, milk, and spices.
- **Animated Price Ticker:** Follow product prices and percentage changes through a continuously scrolling ticker.
- **Daily Price Movements:** Discover products with the highest price increases and decreases.
- **Product Catalogue:** Browse the complete product collection through a responsive card-based layout.
- **Category Navigation:** Explore products by category with clear active navigation states.
- **Market-wise Price Comparison:** View minimum, maximum, and average prices across 12 regional markets.
- **Price Sorting:** Sort category products by lowest or highest price.
- **Bengali Localization:** Display prices, dates, and percentages using Bengali numerals.
- **User Authentication:** Register and sign in using email/password or supported social login providers.
- **Protected Product Details:** Keep detailed market information accessible to authenticated users.
- **Profile Management:** View account information, update your display name, and sign out.
- **Loading Experience:** Use route-specific loading skeletons and Suspense fallbacks for smoother navigation.
- **Custom Error Pages:** Provide a helpful Bengali-language page when a route cannot be found.
- **Responsive Interface:** Deliver a consistent experience across mobile, tablet, and desktop screens.

---

## Technology Stack

| Area | Technologies |
|---|---|
| Framework | Next.js App Router |
| Frontend | React, TypeScript |
| Styling | Tailwind CSS v4 |
| Authentication | Better Auth |
| Database | MongoDB |
| UI Components | HeroUI |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Typography | Hind Siliguri, Geist |
| Deployment | Vercel |

---

## User Experience & Design

BazarDor follows a Bengali-first, mobile-first design philosophy.

- Bengali typography and localized number formatting.
- Consistent spacing, typography, and visual hierarchy.
- Responsive product grids and navigation.
- Accessible labels and visible keyboard focus states.
- Reduced-motion support for users who prefer less animation.
- Loading feedback and friendly error states.

---

## Application Architecture

The application is organized around three main layers:

**1. Data Layer**

Retrieves market, category, and product information from the public BazarDor data API. Typed accessors help keep data handling consistent throughout the application.

**2. Presentation Layer**

Uses Next.js App Router and React Server Components to render data-driven pages. Interactive elements are isolated into client components where needed.

**3. Authentication Layer**

Uses Better Auth with the MongoDB adapter to manage user sessions and protect authenticated areas of the application.

---

## Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

- Node.js 20 or later
- npm
- MongoDB database
- OAuth application credentials for the social login providers you enable

### Installation

```bash
# Clone the repository
git clone https://github.com/Avijit35cse/Bazar-Dor.git

# Navigate to the project directory
cd Bazar-Dor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the project root.

Add the required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Use the appropriate production URL for `BETTER_AUTH_URL` when deploying.

**Security:** Never commit environment files or expose private credentials in your repository.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Deployment

BazarDor is deployed on Vercel.

To deploy your own instance:

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Add the appropriate OAuth callback URLs to your provider settings.
4. Deploy the application.

The application supports direct navigation and page refreshes on its dynamic routes.

---

## Project Structure

```text
bazar-dor/
├── public/
│   ├── bazar-hero.png
│   └── logo-icon.png
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (home)/
│   │   ├── api/
│   │   ├── category/[slug]/
│   │   ├── product/[slug]/
│   │   ├── profile/
│   │   ├── components/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   └── shared/
│   ├── lib/
│   └── types/
├── public/
├── package.json
└── tsconfig.json
```

---

## About the Developer

**Avijit Barua**  
Junior Frontend Developer | Web Developer

I enjoy building practical, user-focused web applications with modern frontend technologies. BazarDor reflects my interest in creating accessible digital experiences that solve everyday problems.

- **GitHub:** [@Avijit35cse](https://github.com/Avijit35cse)
- **Portfolio:** [avijitbarua-dev.vercel.app](https://avijitbarua-dev.vercel.app)
- **LinkedIn:** [linkedin.com/in/avijit-barua-dev](https://linkedin.com/in/avijit-barua-dev)

---

<p align="center">
  <strong>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে। 🇧🇩</strong>
  <br />
  Making everyday market information easier to understand.
</p>
