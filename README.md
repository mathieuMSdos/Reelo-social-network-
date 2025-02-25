# Reello

Reello is a modern social network designed for seamless and engaging microblogging. Built with Next.js 15, it offers a high-performance, scalable, and user-friendly experience for sharing thoughts, media, and interacting with a community.

## Features

- 📝 **Microblogging**: Post short messages, images
- 🔄 **Real-time updates**: Instant UI updates with TanStack Query.
- ❤️ **Likes**: Interact with posts through a familiar engagement system.
- 📸 **Media uploads**: Upload and store images/videos with Cloudivfy.
- 🔐 **Authentication**: Secure login with NextAuth (Google OAuth integration).
- 🏎 **High performance**: Optimized queries, pagination, and caching.

## Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Zod** (Validation)
- **TanStack Query** (Data fetching & caching)
- **Zustand** (State management)

### Backend

- **Next.js Server action**
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth** (JWT-based auth)
- **Cloudivfy (Image Cloud storage and Transform)**

### Testing & CI/CD

- **Jest & React Testing Library**
- **Playwright** (End-to-end testing)
- **GitHub Actions** (CI/CD pipeline)

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/reelo-social-network.git
   ```
2. Navigate to the project directory:
   ```bash
   cd reelo-social-network
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License.
