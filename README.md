# SaaS Landing Page

A modern, responsive SaaS landing page built with Next.js, designed for platforms focused on fast deployment and scaling. Features a sleek dark theme, smooth animations, and comprehensive sections to showcase your product's value proposition.

## 🚀 Features

- **Hero Section**: Eye-catching introduction with live terminal mockup and animated elements
- **Features Showcase**: Highlight key product capabilities with icons and descriptions
- **How It Works**: Step-by-step process explanation
- **Testimonials**: Social proof from satisfied customers
- **Pricing Plans**: Flexible pricing tiers with clear feature comparisons
- **Contact Form**: Integrated contact form for lead generation
- **Call-to-Action**: Compelling CTAs to drive conversions
- **Theme Toggle**: Dark/light mode support
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Powered by Framer Motion for engaging user experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme Management**: Next Themes
- **Forms**: React Hook Form
- **Deployment**: Ready for Vercel or any Node.js hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saas-landing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the landing page.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
saas-landing/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main landing page
│   └── favicon.ico         # Favicon
├── components/
│   ├── Hero.tsx            # Hero section with terminal mockup
│   ├── Features.tsx        # Product features showcase
│   ├── HowItWorks.tsx      # Process explanation
│   ├── Testimonials.tsx    # Customer testimonials
│   ├── Pricing.tsx         # Pricing plans
│   ├── ContactForm.tsx     # Contact form component
│   ├── CTA.tsx             # Call-to-action section
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Site footer
│   ├── ThemeToggle.tsx     # Dark/light theme switcher
│   ├── ThemeProvider.tsx   # Theme context provider
│   ├── LogoMarquee.tsx     # Animated logo marquee
│   └── StickyScroll.tsx    # Sticky scroll component
├── styles/
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── eslint.config.mjs       # ESLint configuration
```

## 🎨 Customization

### Colors and Branding
- Primary color: Emerald (#10b981)
- Background: Dark slate (#020617)
- Update colors in `tailwind.config.js` and component files

### Content
- Edit text content in individual component files
- Update pricing plans in `components/Pricing.tsx`
- Modify testimonials in `components/Testimonials.tsx`

### Features
- Add new sections by creating components in the `components/` directory
- Import and include them in `app/page.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- Render
- AWS Amplify

Build command: `npm run build`
Start command: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.
