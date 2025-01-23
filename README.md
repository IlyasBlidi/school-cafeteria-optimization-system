# 🍽️ Sariaa - Smart Cafeteria Management System

<div style="display: flex; justify-content: center; align-items: center; column-gap: 2rem;">

<span>

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)

</span>

<span>

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-brightgreen?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)

</span>

<span>

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</span>

</div>

> 🚀 Revolutionizing campus dining with smart, digital solutions

## 🌟 Overview

Frew is a cutting-edge cafeteria digitalization platform designed to transform the traditional campus dining experience. By introducing virtual rechargeable cards and smart recommendation systems, we're making campus dining faster, smarter, and more enjoyable.

### 🎯 Key Features

- 💳 Virtual Rechargeable Cards
- 🤖 AI-Powered Menu Recommendations
- ⚡ Real-time Order Tracking
- 📊 Smart Analytics Dashboard
- 🔐 Secure Payment System
- 📱 Responsive PWA Design

## 🛠️ Tech Stack

### Frontend

- **Next.js 13** - React framework with server-side rendering
- **Tailwind CSS** - Utility-first CSS framework
- **Progressive Web App (PWA)** - For native-like experience
- **Vercel** - For deployment and hosting

### Backend

- **Spring Boot** - Java-based framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **PostgreSQL** - Primary database
- **Redis** - Caching layer

### DevOps & Tools

- **WSL2** - Windows Subsystem for Linux
- **Docker** - Containerization
- **Git** - Version control
- **GitHub Actions** - CI/CD

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Java JDK 17+
- WSL2 with Ubuntu
- Docker
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/IlyasBlidi/sariaa.git
cd frew
```

2. Setup Frontend

```bash
cd frontiaa
npm install
npm run dev
```

3. Setup Backend

```bash
cd backend
./mvnw spring-boot:run
```

4. Access the application

```txt
Frontend: http://localhost:3000
Backend: http://localhost:8080
```

## 👥 Team

| Member                 | Role             | Responsibilities                  |
| ---------------------- | ---------------- | --------------------------------- |
| **BLIDI Ilyas**        | Backend Lead     | Spring Boot, Architecture, ML/AI  |
| **ELRHARBI Mouad**     | Frontend Lead    | Next.js, UI/UX, Vercel Deployment |
| **BOUFAROUJ Marouane** | Integration Lead | Testing, Documentation, DevOps    |

## 📋 Project Structure

```txt
sariaa/
├── frontiaa/               # Next.js application
│   ├── .next               # Next.js build output
│   ├── node_modules        # Dependencies
│   ├── public              # Static assets
│   ├── src/                # Source directory
│   │   ├── app/            # App router
│   │   │   ├── layout.tsx  # Root layout
│   │   │   └── page.tsx    # Home page
│   │   └── globals.css     # Global styles
│   ├── .eslintrc.json      # ESLint configuration
│   ├── .gitignore          # Git ignore rules
│   ├── next-env.d.ts       # Next.js TypeScript declarations
│   ├── next.config.ts      # Next.js configuration
│   ├── package.json        # Project dependencies
│   ├── postcss.config.mjs  # PostCSS configuration
│   ├── README.md           # Frontend documentation
│   ├── tailwind.config.ts  # Tailwind CSS configuration
│   └── tsconfig.json       # TypeScript configuration
├── backend/                # Spring Boot application
│   ├── src/main/java       # Java source files
│   ├── src/main/resources  # Application resources
│   └── src/test            # Test files
└── docs/                  # Documentation
```

## 🌟 Features in Detail

### For Students

- 👤 Personal account management
- 💰 Virtual card balance tracking
- 🍽️ Smart menu recommendations
- 📱 Real-time order tracking
- 📬 Low balance notifications

### For Administration

- 📊 Real-time analytics dashboard
- 🗂️ Menu management system
- 📈 Traffic analysis
- 💹 Financial reporting
- 👥 User management

---

<div align="center">
  Made with 🍳 by the Frew Team
</div>
