# Micro Saas - Project in Bio

## Description
This is a Micro Saas project developed during the Micro Saas course by Rocketseat.
The objective of this project is to provide an page for developers to showcase their projects.

## Built With
- [Next.js v15](https://nextjs.org/) and [ReactJS v19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (UI)
- [Firebase](https://firebase.google.com/) (Database and storage)
- [Auth.js](https://authjs.dev/) (Google Authentication)

## Requirements
 - [Setup Firebase Cloud Firestore](https://firebase.google.com/docs/firestore?hl=pt-br)
   - [Export Firebase Credentials](https://firebase.google.com/docs/admin/setup?hl=pt&authuser=0)
 - [Setup Firebase Cloud Storage](https://firebase.google.com/docs/storage?hl=pt-br)
   - Get Firebase bucket name

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
  pnpm run dev
  ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Screenshots

## TODO
 - [ ] Allow to edit or remove user card custom links
 - [ ] Allow to edit or remove projects
