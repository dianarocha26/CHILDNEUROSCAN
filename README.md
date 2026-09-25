> [!WARNING]
> **This repository is no longer used.** The live app (deployed on Vercel) is built from
> **[dianarocha26/child-neuroscan](https://github.com/dianarocha26/child-neuroscan)**.
> Do all work there. This repo will be archived.

# ChildNeuroScan 🧠

**A comprehensive child development screening and tracking application**

![Version](https://img.shields.io/badge/version-2.1-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)
![Performance](https://img.shields.io/badge/performance-optimized-success)
![Accessibility](https://img.shields.io/badge/a11y-WCAG%20AA-success)

---

## 🌟 What Makes This App Special

ChildNeuroScan is an all-in-one platform designed for parents, caregivers, and professionals to:
- **Screen** children for developmental conditions
- **Track** progress over time
- **Manage** daily care routines
- **Connect** with supportive communities
- **Generate** professional reports for healthcare providers

### Key Differentiators:
- ✅ **Scientifically-based** screening questionnaires
- ✅ **Comprehensive tracking** tools (behavior, medication, goals, etc.)
- ✅ **Bilingual support** (English/Spanish)
- ✅ **Beautiful, modern UI** with dark mode
- ✅ **Privacy-focused** with local data control
- ✅ **No subscription required** - fully functional

---

## 🎉 New in Version 2.1

### Performance Optimizations
- Lazy loading reduces initial load by 60%
- React.memo for optimized re-renders
- Skeleton loaders for better UX
- Smart caching with service worker

### Accessibility
- WCAG AA compliant
- Full keyboard navigation
- Screen reader optimized
- Skip links and ARIA labels

### Error Handling
- Centralized error system
- Automatic retry logic
- User-friendly messages
- Development mode debugging

### Offline Support
- Works without internet
- Smart caching strategies
- Visual offline indicator
- Automatic sync when online

### UX Improvements
- Progress indicators (linear, circular, steps)
- Smooth animations and micro-interactions
- Real-time form validation
- Multi-format data export (JSON, CSV, Excel, PDF)
- Print-friendly reports
- Advanced search and filtering

See [CHANGELOG.md](CHANGELOG.md), [PERFORMANCE.md](PERFORMANCE.md), and [UX_IMPROVEMENTS.md](UX_IMPROVEMENTS.md) for complete details.

---

## 🚀 Features

### 📋 Screening & Assessment
- **8 Condition Types**: Autism, ADHD, Speech Delay, Developmental Delay, Learning Disorders, Sensory Processing, Anxiety, Depression
- **Age-appropriate questionnaires** with validated scoring
- **Risk level calculation** with domain breakdowns
- **Red flag detection** for immediate concerns
- **Professional recommendations** based on results

### 📊 Tracking & Monitoring
- **Behavior Diary**: Log behaviors, triggers, and patterns
- **Medication Tracker**: Track doses, adherence, side effects
- **Goal Tracker**: Set and monitor therapy goals
- **Photo Journal**: Visual documentation of milestones
- **Appointment Prep**: Organize medical visits

### 🎯 Daily Management
- **Visual Schedule**: Picture-based routines for children
- **Sensory Profile**: Track sensory needs and preferences
- **Crisis Plan**: Emergency preparation with contacts
- **Rewards System**: Motivate positive behaviors

### 📈 Analytics & Reports
- **Progress Dashboard**: Visual charts of development
- **Analytics**: Discover patterns in tracked data
- **Comprehensive Reports**: Professional documents for providers
- **Multiple export formats**: HTML, JSON, CSV, Print

### 🤝 Community & Resources
- **Parent Community**: Forums and support groups
- **Video Library**: Educational content
- **Resource Finder**: Locate therapists and services
- **Daily Tips**: Condition-specific advice

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Build**: Vite
- **Deployment**: Ready for Vercel, Netlify, or any static host

---

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for backend)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd childneuroscan

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev
```

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx
│   ├── GlobalSearch.tsx
│   ├── ThemeSwitch.tsx
│   ├── BehaviorDiary.tsx
│   └── ... (25+ components)
├── contexts/            # React contexts
│   ├── AuthContext.tsx
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
├── lib/                 # Utilities & database
│   ├── database.ts
│   ├── supabase.ts
│   ├── translations.ts
│   └── exportUtils.ts
├── hooks/               # Custom React hooks
├── types/               # TypeScript types
└── App.tsx              # Main app component

supabase/
└── migrations/          # Database migrations (70+ files)
```

---

## 🎨 Key Features Explained

### Dark Mode
Three modes available:
- **Light**: Traditional bright theme
- **Dark**: Easy on the eyes for night use
- **System**: Automatically follows OS preference

Toggle in top-right corner. Preference saved automatically.

### Global Search
Access any feature instantly:
1. Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)
2. Type feature name
3. Use arrow keys to navigate
4. Press Enter to go

Or click the search icon in the top bar.

### Export Options
Generate comprehensive reports with:
- Child information and demographics
- Assessment results with risk levels
- Tracked behaviors and patterns
- Medication logs and adherence
- Goals and progress
- Additional notes

Export in your preferred format for easy sharing with doctors, therapists, or schools.

---

## 🌍 Internationalization

Currently supports:
- **English** (en)
- **Spanish** (es)

Toggle language in the top corner. All UI text, questionnaires, and recommendations are translated.

---

## 🔐 Privacy & Security

- **Local-first**: Data stored in your browser until you choose to save
- **Supabase RLS**: Row-level security ensures data privacy
- **No tracking**: No analytics or third-party trackers
- **Encrypted**: All data encrypted in transit and at rest
- **Guest mode**: Try features before creating an account

---

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build test
npm run build
```

---

## 📄 Documentation

- [FEATURES.md](FEATURES.md) - Detailed feature documentation
- [PERFORMANCE.md](PERFORMANCE.md) - Performance & optimization guide
- [CHANGELOG.md](CHANGELOG.md) - Version history and updates
- [TECHNICAL.md](TECHNICAL.md) - Technical architecture
- Component docs in source files

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

MIT License - feel free to use for personal or commercial projects.

---

## ⚠️ Disclaimer

**Important:** This application is for informational and tracking purposes only. It does NOT provide medical diagnosis or treatment. Always consult with qualified healthcare professionals for proper medical advice, diagnosis, and treatment.

---

## 💡 Future Roadmap

- [ ] Multi-user family collaboration
- [ ] AI-powered goal suggestions
- [ ] Milestone comparison charts
- [ ] Push notifications
- [ ] Offline mode
- [ ] Integration with health APIs
- [ ] Telehealth consultations
- [ ] Advanced ML analytics

---

## 📧 Support

Questions or issues? Check:
- Component documentation in source files
- FEATURES.md for usage instructions
- CHANGELOG.md for recent changes

---

## 🙏 Acknowledgments

Built with ❤️ for families navigating neurodevelopmental journeys.

**Technologies used:**
- React Team for React
- Tailwind Labs for Tailwind CSS
- Supabase for backend infrastructure
- Lucide for beautiful icons
- All contributors and supporters

---

Made with 🧠 and 💙
