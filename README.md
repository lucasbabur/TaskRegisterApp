# TaskRegisterApp Codebase

This is a web application I created to register and measure my own productivity. Initially, I didn't even planned on showcasing this, but I believe it is polished enough to do so.

Live Demo: [task-register-app.vercel.app](https://task-register-app.vercel.app/)

## Features

Note: Each feature of this application was developed with my personal requirements in mind. Originally created solely for my use, I've now refined it to a level that I feel confident sharing it on my GitHub.

- **Task Registration** : This is the cornerstone of the app. Users can fill in tasks using a form that includes specific questions crucial for measuring productivity.
- **Productivity Scoring** : Each task contributes to a daily productivity score. This score reflects the peak productivity achievable with planned tasks over a 16-hour period.
- **Firebase Integration** : The application leverages Firebase for data handling. The database design is flexible, facilitating efficient task queries and graphical data representation.
- **Graphical Insights** : The app includes graphs to visually represent productivity and other user-defined key metrics.
- **Task Monitoring** : This feature enables tracking of specific task types. Tasks are tagged in the database, allowing for targeted queries and pattern analysis, particularly useful for consistent activities like exercise.
- **Productivity Analysis** : This section assists in evaluating daily productivity. It features a graph displaying three main metrics: productivity score, time spent seated/standing, and adherence to planned task scheduling.
- **Mobile Compatibility** : Though not present in this repository due to .gitignore constraints, the application is configured for mobile use, as indicated in the next configuration file and the capacitor configuration.

## Getting Started

1. **Installation** : Clone the repository and install dependencies with `pnpm install`.
2. **Environment Setup** : Set up Firebase, placing the environment variables
3. **Running the App** : Start the development server with `pnpm run dev`.

## To-do

1. **AI-Powered Recommendations** : Integrate AI to provide suggestions based on completed tasks.
2. **Procedures Tab** : A proposed feature to include a repository of protocols for different situational responses, inspired by the developer's personal task app.
3. **Code Optimization** : Identify and remove any superfluous or redundant code segments.
