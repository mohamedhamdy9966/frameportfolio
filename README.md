# Frame Portfolio Workspace

Welcome to the **Frame Portfolio** project! This repository uses a monorepo-style structure to house the entire application stack for the portfolio system. It is divided into three distinct applications, each serving a specific purpose.

## 📂 Project Structure

This workspace is composed of three main applications:

- **`client/`** (Next.js Application)
  - The main user-facing frontend of the portfolio.
  - Showcases projects, technologies, and achievements.
  - Built with modern React and Next.js.
- **`admin/`** (Next.js Application)
  - A secure, dedicated admin dashboard.
  - Intended for managing portfolio content, reviewing stats, and configuring the site.
  - Bootstrapped with Next.js 15+ App Router and Tailwind CSS.
- **`server/`** (NestJS Application)
  - The backend server providing API endpoints to both the `client` and `admin` portals.
  - Handles business logic, database connections, and secure data interactions.
  - Structured dynamically with NestJS and written in TypeScript.

## 🚀 Getting Started

To run the applications locally, you will need to start the development servers for each of the services you wish to use.

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v18+)
- npm or yarn

### 1. Starting the Backend Server
Navigate to the `server/` directory, install dependencies, and start the development server.
```bash
cd server
npm install
npm run start:dev
```

### 2. Starting the Main Portfolio Client
Navigate to the `client/` directory, install dependencies, and start the Next.js development server.
```bash
cd client
npm install
npm run dev
```

### 3. Starting the Admin Dashboard
Navigate to the `admin/` directory, install dependencies, and start the admin Next.js server.
```bash
cd admin
npm install
npm run dev
```

## 🛠️ Features & Technologies

- **Frontend Tech Stack**: React, Next.js, Styled Components (Client), Tailwind CSS (Admin).
- **Backend Tech Stack**: NestJS, TypeScript, Jest for testing.
- **Tools**: ESLint, Prettier, PostCSS.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
