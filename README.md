# 🎓 StudyMaster - AI-Powered Student Success Platform

<div align="center">

![StudyMaster Logo](https://via.placeholder.com/200x200/10b981/ffffff?text=🎓)

**The ultimate workspace for students. Organize assignments, track your GPA, and use AI to simplify complex concepts—all in one place.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-FF6B6B?logo=openai)](https://openai.com/)

[🚀 Live Demo](#-live-demo) • [📖 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [⚡ Quick Start](#-quick-start) • [📱 Screenshots](#-screenshots)

</div>

---

## 🌟 What is StudyMaster?

StudyMaster is a comprehensive, AI-powered student productivity platform designed to help students excel in their academic journey. Whether you're managing multiple courses, preparing for exams, or collaborating on group projects, StudyMaster provides all the tools you need in one unified platform.

### 🎯 Why StudyMaster?

- **📚 AI Study Assistant**: Upload lecture notes and get instant summaries or practice questions
- **🎯 Smart Task Management**: Never miss a deadline with automated reminders and syllabus sync
- **📊 Performance Tracking**: Monitor your GPA and study progress across all courses
- **🤝 Collaboration Hub**: Share workspaces for group projects with real-time updates
- **📱 PWA Ready**: Install as a native app on any device
- **♿ Accessibility First**: Built with accessibility features for all students

---

## 🚀 Live Demo

Experience StudyMaster in action! Visit our live demo to explore all features:

**[🔗 Try StudyMaster Now](https://your-demo-url.com)**

*No registration required for the demo - just click and explore!*

---

## ⭐ Features

### 🎯 Core Dashboard
- **Overview Dashboard**: Real-time insights into your academic performance
- **Task Management**: Create, organize, and track assignments across all courses
- **Calendar Integration**: Schedule study sessions, exams, and deadlines
- **Statistics Tracker**: Monitor GPA, study hours, and progress trends

### 🤖 AI-Powered Features
- **Study Buddy**: AI assistant that helps explain complex concepts
- **Smart Summaries**: Transform lecture notes and textbooks into concise summaries
- **Practice Questions**: Generate quiz questions from your course materials
- **Syllabus Parser**: Automatically extract important dates and assignments from uploaded syllabi

### 📱 Student Tools
- **Focus Sessions**: Pomodoro-style study sessions with progress tracking
- **Group Collaboration**: Shared workspaces for team projects
- **File Management**: Upload and organize course materials
- **Progress Analytics**: Detailed insights into your study patterns

### 🔧 Advanced Features
- **PWA Support**: Install as a native app on mobile and desktop
- **Offline Capability**: Continue working without internet connection
- **Accessibility Features**: Screen reader support, high contrast mode, font sizing
- **Dark Theme**: Reduce eye strain during late-night study sessions
- **Multi-device Sync**: Access your data from anywhere

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and interactions
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Authentication & Backend
- **[Clerk](https://clerk.com/)** - Complete authentication solution
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Server-side functionality

### AI & Processing
- **[Hugging Face Inference](https://huggingface.co/inference)** - AI-powered text processing
- **[Tesseract.js](https://github.com/naptha/tesseract.js)** - OCR for document parsing
- **[PDF Parse](https://www.npmjs.com/package/pdf-parse)** - PDF content extraction
- **[Mammoth.js](https://www.npmjs.com/package/mammoth)** - DOCX file processing

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixes

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/studymaster.git
   cd studymaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   HUGGINGFACE_API_KEY=your_huggingface_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🎉 You're ready to go!

---

## 📁 Project Structure

```
studymaster/
├── 📂 app/                          # Next.js App Router
│   ├── 📂 api/                      # API routes
│   │   ├── 📂 auth/                 # Authentication endpoints
│   │   └── 📂 parse-syllabus/       # Syllabus parsing API
│   ├── 📂 dashboard/                # Dashboard pages
│   │   ├── 📂 [courseId]/           # Course-specific pages
│   │   └── 📂 focus/                # Focus session pages
│   ├── 📂 sign-in/                  # Authentication pages
│   ├── 📂 sign-up/
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Landing page
├── 📂 components/                   # Reusable UI components
│   ├── 📂 Auth*.tsx                 # Authentication components
│   ├── 📂 Dashboard*.tsx            # Dashboard components
│   ├── 📂 *.tsx                     # Feature components
│   └── 📂 *.tsx                     # UI components
├── 📂 contexts/                     # React contexts
│   └── AuthContext.tsx              # Authentication context
├── 📂 hooks/                        # Custom React hooks
│   ├── use*.ts                      # Feature-specific hooks
│   └── 📂 usePWA.ts                 # PWA functionality
├── 📂 types/                        # TypeScript type definitions
│   ├── dashboard.ts                 # Dashboard types
│   └── *.ts                         # Other type definitions
├── 📂 public/                       # Static assets
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service worker
│   └── 📂 *.svg                     # Icons and images
├── 📂 styles/                       # Global styles
│   └── globals.css                  # Tailwind imports
├── 📄 package.json                  # Dependencies and scripts
├── 📄 tailwind.config.js            # Tailwind configuration
├── 📄 next.config.ts                # Next.js configuration
├── 📄 tsconfig.json                 # TypeScript configuration
└── 📄 eslint.config.mjs             # ESLint configuration
```

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/studymaster)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Other Platforms

**Netlify:**
```bash
npm run build
# Upload the 'out' directory to Netlify
```

**Railway:**
```bash
railway login
railway init
railway up
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📱 Screenshots

### 🏠 Landing Page
*Beautiful marketing page with hero section, features, and testimonials*

### 📊 Dashboard
*Comprehensive student dashboard with real-time insights*

### 🤖 AI Study Assistant
*Interactive AI-powered study tools and question generation*

### 📱 Mobile Experience
*Fully responsive design that works perfectly on all devices*

---

## 🎯 Key Features Deep Dive

### 🤖 AI-Powered Study Assistant
Our AI assistant can:
- **Summarize complex topics** from your lecture notes
- **Generate practice questions** for exam preparation
- **Explain difficult concepts** in simple terms
- **Create study schedules** based on your workload

### 📊 Performance Tracking
Track your academic progress with:
- **GPA monitoring** across all courses
- **Study time analytics** and patterns
- **Assignment completion rates**
- **Grade trends and insights**

### 📚 Smart Organization
Stay organized with:
- **Syllabus synchronization** - upload and auto-extract dates
- **Task prioritization** based on deadlines and importance
- **Course-specific workspaces** for better organization
- **File management** for all your study materials

### 🤝 Collaboration Features
Work together with:
- **Shared project spaces** for group assignments
- **Real-time updates** on shared tasks
- **Comment system** for feedback and discussion
- **Task assignment** within teams

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Code Quality
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
```

### Environment Variables

Create a `.env.local` file with:

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# AI Services (Hugging Face)
HUGGINGFACE_API_KEY=hf_...

# Database (if using external DB)
DATABASE_URL=postgresql://...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Code Style & Standards

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Airbnb configuration with additional rules
- **Prettier**: Automatic code formatting
- **Conventional Commits**: Follow conventional commit format

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our coding standards
4. **Write tests** for new functionality
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Contribution Guidelines

- **Follow TypeScript best practices**
- **Write meaningful commit messages**
- **Add tests for new features**
- **Update documentation** as needed
- **Ensure accessibility** compliance
- **Test on multiple devices/browsers**

### 🐛 Reporting Issues
