# SampleApp Codebase

## Introduction

SampleApp is a web application boilerplate built using NextJS, ChakraUI, Yup, Formik, Preact Signals, and Firebase. It's designed to offer the fastest development experience possible.

Live Demo: [SampleApp (sampleapp-xi.vercel.app)](https://sampleapp-xi.vercel.app/)

## Features

- **Home Page Components** : A variety of components such as Hero, Navbar, Footer, Schedule, Sponsors, and WhyComponent, each with unique functionalities and styles.
- **Form Handling** : Utilizes Formik for managing form states, Yup for validation schemas, and custom field components to handle different input types.
- **Firebase Integration** : Authentication and Firestore database interactions are handled with Firebase services.
- **Theming** : Customizable theme configurations with ChakraUI for a consistent and modifiable design system.
- **Sidebar Navigation** : Dynamic sidebar navigation in the application, leveraging React context for state management.
- **Optimized Landing Page:** The initial landing page has almost perfect lighthouse scores in performance, SEO, accessibility and best practices.

## Directory Structure

- `src/`: Source files for the application.
  - `backEnd/`: Backend-related configurations and schema definitions.
    - `middlewares/`: Useful general use middlewares
    - `schemas/`: Schemas to validate data
  - `components/`: Reusable components for the application.
  - `config/`: Configuration files for the application. Differently from most applications, I also include here the instances of the general abstraction components in the components folder.
  - `firebase/`: Firebase configuration and context setup.
  - `pages/`: Next.js pages for routing.
  - `theme/`: Custom theme configurations for ChakraUI.

## Key Components

1. **Form Components**: Custom input fields, radio buttons, and selectors with integrated validation -- designed to be extremely fast to develop and change.
2. **Sidebar**: A dynamic sidebar with context-based state management.
3. **Firebase Context**: Context API for managing Firebase state across the app.
4. **API Routing**: Configured Next.js API routes with various middlewares.

## Getting Started

1. **Installation** : Clone the repository and install dependencies with `pnpm install`.
2. **Environment Setup** : Set up Firebase, placing the environment variables
3. **Running the App** : Start the development server with `pnpm run dev`.

## To-do

1. **Add support to light theme**
2. **Improve the design of the landing page**
3. **Add Analytics**
