# Prossfora Frontend

A modern admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS for the Prossfora contractor management platform.

## 🚀 Features

- **Admin Dashboard**: Comprehensive admin panel for managing users, jobs, and platform analytics
- **User Management**: View and manage contractors, customers, and company accounts
- **Job Management**: Track active, completed, and flagged jobs
- **Financial Overview**: Monitor transactions, payouts, and revenue
- **Analytics & Reports**: Platform activity insights and user statistics
- **Responsive Design**: Mobile-first approach with collapsible sidebar navigation
- **Custom Branding**: Prossfora color scheme with Cerulean Blue, Pacific Blue, Muted Olive, and Yarrow Gold

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React & Tabler Icons
- **HTTP Client**: Axios
- **Animations**: tw-animate-css

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Prossfora Backend API running on `http://localhost:5000`

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/prossfora-frontend.git
   cd prossfora-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   If your backend serves routes under `/api/v1` (e.g. `http://localhost:5000/api/v1/jobs`), use:
   `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1` to avoid 404s on job and contractor requests.

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
prossfora-frontend/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Admin dashboard
│   │   └── admin/
│   │       ├── layout.tsx   # Dashboard layout with sidebar
│   │       ├── page.tsx     # Dashboard home
│   │       ├── users/       # User management pages
│   │       ├── jobs/        # Job management pages
│   │       ├── financial/   # Financial pages
│   │       ├── analytics/   # Analytics pages
│   │       ├── moderation/  # Content moderation
│   │       ├── support/     # Support tickets
│   │       └── settings/    # Platform settings
│   ├── globals.css          # Global styles & Tailwind config
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── CompanyHeader.tsx    # Dashboard header
│   ├── InfoCard.tsx         # Job information card
│   ├── UserCard.tsx         # User information card
│   ├── nav-main.tsx         # Main navigation
│   ├── nav-projects.tsx     # Projects navigation
│   └── nav-user.tsx         # User profile dropdown
├── lib/
│   └── utils.ts             # Utility functions
└── public/
    └── assets/              # Static assets
```

## 🎨 Design System

### Color Palette

- **Cerulean Blue** (`#0f2143`): Primary brand color
- **Pacific Blue** (`#354e56`): Secondary accents
- **Muted Olive** (`#43572e`): Success states
- **Yarrow Gold** (`#8b6212`): Highlights & warnings

### Typography

- **Primary Font**: Roboto
- **Monospace Font**: Geist Mono

## 🔐 Authentication Routes

- `/sign-in` - User login
- `/sign-up` - User registration
- `/forgot-password` - Password recovery

## 📊 Admin Dashboard Routes

- `/admin` - Dashboard home
- `/admin/users` - All users
- `/admin/users/companies` - Company accounts
- `/admin/users/contractors` - Contractor accounts
- `/admin/users/pending` - Pending approvals
- `/admin/jobs` - All jobs
- `/admin/jobs/active` - Active jobs
- `/admin/jobs/completed` - Completed jobs
- `/admin/jobs/flagged` - Flagged jobs
- `/admin/financial/*` - Financial management
- `/admin/analytics/*` - Analytics & reports
- `/admin/moderation/*` - Content moderation
- `/admin/support/*` - Support & logs
- `/admin/settings` - Platform settings

## 🔌 API Integration

The frontend connects to the Prossfora backend API:

```typescript
// Example API call
axios.get("http://localhost:5000/api/users/all").then((response) => {
  // Handle response.data.data
});
```

### API Endpoints Used

- `GET /api/users/all` - Fetch all users
- `GET /api/jobs/all` - Fetch all jobs
- More endpoints as needed...

## 🚀 Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Deployment Options

- **Vercel**: Recommended for Next.js apps
- **Netlify**: Easy deployment with Git integration
- **Docker**: Containerized deployment
- **Traditional hosting**: Build and serve static files

## 🧪 Development

### Code Style

- ESLint for code quality
- TypeScript for type safety
- Prettier for code formatting (recommended)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: Your Name
- **Backend API**: [Link to backend repo]

## 📞 Support

For issues and questions:

- Create an issue in this repository
- Contact: support@prossfora.com

## 🔄 Changelog

### v1.0.0 (2025-01-10)

- Initial release
- Admin dashboard with user and job management
- Custom Prossfora branding
- Responsive sidebar navigation
- API integration with backend

---

Made with ❤️ for Prossfora
