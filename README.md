# Task Management Delta

A task management application built using **Next.js**. Helps you organize, track, and manage tasks through a clean, modern interface.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)

---

## Demo
![Login Page](<Screenshot 2025-09-24 115233.png>)
---
![Home Screen](<Screenshot 2025-09-24 115338.png>)
---
![Add-Task Form](<Screenshot 2025-09-24 115400.png>)
---
![Edit-Task Form](<Screenshot 2025-09-24 115422.png>)
---

## Features

- Create, edit, tasks
- Task categorization (e.g. by status)
- Responsive UI
- State management via store
- Quick Set Time Btns

---

## Tech Stack

| Component          | Technology       |
| ------------------ | ---------------- |
| Frontend framework | Next.js          |
| State management   | Zustand          |
| Styling / CSS      | Tailwind         |
| Other libraries    | Shadcn/ui , antd |


---

## Getting Started

### Prerequisites

Make sure you have:

- Node.js (version 20.0 or higher)
- npm / yarn / pnpm installed

---

### Installation

```bash
git clone https://github.com/dasharath-delta/task-management-delta.git
cd task-management-delta
npm install
# or
yarn
# or
pnpm install
Running Locally
bash
Copy code
npm run dev
# or
yarn dev
# or
pnpm dev
Then open http://localhost:3000 in your browser to view the app.

Project Structure
ruby
Copy code
task-management-delta/
├── app/               # Next.js app directory
├── components/        # UI components
├── data/              # Any seed / mock data
├── lib/               # Utility functions / helpers
├── public/            # Public assets
├── store/             # State management
├── .gitignore
├── .prettierignore
├── .prettierrc
├── next.config.mjs
├── package.json
└── README.md

ini
Copy code
NEXT_PUBLIC_API_URL=your_api_endpoint
NODE_ENV=development
```