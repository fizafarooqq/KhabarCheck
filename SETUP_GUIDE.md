# Khabar Check - Setup Guide

## Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/fizafarooqq/KhabarCheck.git
cd KhabarCheck
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. **Run development server**
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `/app` - Next.js 13+ app directory with routes
- `/components` - Reusable React components
- `/public` - Static assets and Chrome extension
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and API clients
- `/styles` - Global CSS styles

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Routes

- `/api/analyze/url` - Analyze a news URL
- `/api/analyze/text` - Analyze text content
- `/api/auth/login` - User login
- `/api/auth/register` - User registration
- `/api/results/[id]` - Get analysis results

## Browser Extension

The Chrome extension is located in `/public/extension`:
- Load it in Chrome as an unpacked extension
- Manifest: `manifest.json`
- Main logic: `popup.js` and `content.js`

## Troubleshooting

### Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Build errors
Ensure Node.js version is 18+:
```bash
node --version
```
