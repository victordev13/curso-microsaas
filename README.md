# Micro Saas - Project in Bio

## Description
This is a Micro Saas project developed during the Micro Saas course by Rocketseat.
The objective of this project is to provide an page for developers to showcase their projects.

## Built With
- [Next.js v15](https://nextjs.org/) and [ReactJS v19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (UI)
- [Firebase](https://firebase.google.com/) (Database and storage)
- [Auth.js](https://authjs.dev/) (Authentication with Google)
- [Stripe](https://stripe.com/) (Payment gateway)

## Requirements

#### Firebase database and storage
 - [Setup Firebase Cloud Firestore](https://firebase.google.com/docs/firestore?hl=pt-br)
   - [Export Firebase Credentials](https://firebase.google.com/docs/admin/setup?hl=pt&authuser=0)
 - [Setup Firebase Cloud Storage](https://firebase.google.com/docs/storage?hl=pt-br)
   - Get Firebase bucket name
   
Add them to your `.env` file:  
```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_STORAGE_BUCKET=
```

#### Auth.js

To use Google authentication in Auth.js, you need to obtain your credentials:

  1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
  2. Create a new project or select an existing one.
  3. Navigate to `APIs & Services > Credentials`.
  4. Click `Create Credentials` > `OAuth 2.0 Client ID`.
  5. Set up the consent screen and configure the redirect URIs.  
    - Authorized JavaScript Sources: `http://localhost:3000`  
    - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
  6. Copy your `Client ID` and `Client Secret`.

Add them to your `.env` file:  
```env
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
```

#### Stripe
  1. [Create a Stripe account](https://dashboard.stripe.com/register)
  2. [Register products and get their Product IDs](https://dashboard.stripe.com/test/products/create)
  3. [Set up a local webhook with stripe cli](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local)
    - Run `pnpm webhook:run` to retrieve the webhook secret
  4. [Get API keys (Public Key, Secret Key)](https://dashboard.stripe.com/test/apikeys)

Add them to your `.env` file:  
```env
STRIPE_LIFETIME_PRICE_ID=
STRIPE_MONTHLY_PRICE_ID=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Getting Started
Follow the steps below to set up the project locally:

1. Clone the repository:
  ```sh
  git clone https://github.com/victordev13/curso-microsaas.git
  ```
2. Navigate to the project directory:
  ```sh
  cd curso-microsaas
  ```
3. Install the dependencies:
  ```sh
  pnpm install
  ```
4. Create and configure the `.env` file:
  ```sh
  cp .env.dist .env
  # Edit the .env file with your Firebase credentials
  ```
5. Start the development server:
  ```sh
  pnpm dev
  ```
6. Start the local stripe webhook:
  ```sh
  pnpm webhook:run
  ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Screenshots

## TODO
 - [ ] Allow to edit or remove user card custom links
 - [ ] Allow to edit or remove projects
