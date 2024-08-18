# Next.js GetMovies

This is a Next.js project that utilizes the OMDB API to search for and list movies by name. The application provides a user-friendly interface for searching movies and displaying details such as title, year, poster, and additional details.

## Technologies Used

- **Next.js:** React framework for server-side rendering and static site generation.
- **OMDB API:** API for retrieving movie and TV show information.
- **TypeScript:** Adds static type checking to JavaScript.
- **OAuth:** Authentication using GitHub and Google.

## Authentication

This application supports OAuth authentication using GitHub and Google. Users can log in using their GitHub or Google accounts, which allows them to access additional features and personalized content.

### OAuth Providers

- **GitHub:** Users can log in using their GitHub account.
- **Google:** Users can log in using their Google account.


## Getting Started

Follow these steps to set up the project locally:

1. **Navigate to the Project Directory:**

   ```bash
   cd repository-name
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env.local` File:**

   ```env
   OMDB_API_KEY=your_OMDB_API_KEY_here

   API_HOST=your_API_HOST_here
   
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_NEXT_PUBLIC_GITHUB_CLIENT_ID_here
   NEXT_PUBLIC_GITHUB_CALLBACK=your_NEXT_PUBLIC_GITHUB_CALLBACK_here

   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_NEXT_PUBLIC_GOOGLE_CLIENT_ID_here
   NEXT_PUBLIC_GOOGLE_CALLBACK=your_NEXT_PUBLIC_GOOGLE_CALLBACK_here
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser to view the application.
