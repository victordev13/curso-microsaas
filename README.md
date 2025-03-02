# Micro Saas - Sou Eu Dev "Project in Bio"

## Description
This is a Micro Saas project developed during the Micro Saas course by Rocketseat.
The objective of this project is to provide an page for developers to showcase their projects.

## Built With
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=flat&logo=auth0&logoColor=white)](https://authjs.dev/)
[![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white)](https://stripe.com/)
[![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat&logo=lucide&logoColor=white)](https://lucide.dev)
[![Resend](https://img.shields.io/badge/Resend-000000?style=flat&logo=resend&logoColor=white)](https://resend.com/)

- [Next.js v15](https://nextjs.org/) and [ReactJS v19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (UI)
- [Firebase](https://firebase.google.com/) (Database and storage)
- [Auth.js](https://authjs.dev/) (Authentication with Google)
- [Stripe](https://stripe.com/) (Payment gateway)
- [Lucide](https://lucide.dev) (Icons)
- [Resend](https://resend.com/) (Email)

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

#### Resend

To use Resend for sending emails, you need to obtain your API key:

1. [Go to the Resend website and create account](https://resend.com/)
2. [Navigate to the API section to generate a new API key](https://resend.com/api-keys)

Add it to your `.env` file:
```env
RESEND_API_KEY=
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
![FireShot Capture 001 -  -  localhost](https://github.com/user-attachments/assets/d04b9759-7453-4943-8a98-225dbc33338e)
![FireShot Capture 002 -  -  localhost](https://github.com/user-attachments/assets/5d66b728-e41e-4842-83ec-97697a92030f)
![FireShot Capture 003 -  -  localhost](https://github.com/user-attachments/assets/0b03ea6c-b099-4c83-87bf-fd9441a917bd)
![FireShot Capture 004 -  -  localhost](https://github.com/user-attachments/assets/5a6f2449-d900-4096-b118-e22b6e27affb)
![FireShot Capture 005 -  -  localhost](https://github.com/user-attachments/assets/716cb8e5-db92-47b7-be52-74ee195bf658)
![2025-02-20_20-02](https://github.com/user-attachments/assets/2ae50488-95da-456a-96d9-bfae34989e12)
![2025-02-20_20-05](https://github.com/user-attachments/assets/63ace6d2-d321-444d-814a-70c0a618c81e)



## TODO
 - [ ] Allow to edit or remove user card custom links
 - [ ] Allow to edit or remove projects
