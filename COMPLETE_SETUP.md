# Complete Setup - Development to Deployment

## 1. Local Development

### Initial Setup
```bash
# Clone and install
git clone https://github.com/fizafarooqq/KhabarCheck.git
cd KhabarCheck
npm install

# Create environment file
cp .env.example .env.local
```

### Running Locally
```bash
npm run dev
```

Visit `http://localhost:3000`

## 2. Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_APP_NAME=Khabar Check
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production (Vercel), add these in the Vercel dashboard.

## 3. Building for Production

```bash
npm run build
npm run start
```

## 4. Deployment to Vercel

### Option A: Automatic (Recommended)

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Select your KhabarCheck repository
5. Framework: Next.js (auto-detected)
6. Root Directory: `./`
7. Click "Deploy"

### Option B: Manual with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Option C: GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 5. Post-Deployment

- Visit your Vercel URL
- Test all API endpoints
- Check browser console for errors
- Monitor analytics in Vercel dashboard

## 6. Chrome Extension Deployment

1. Build the project: `npm run build`
2. Package `/public/extension` folder
3. Submit to Chrome Web Store:
   - Go to [https://chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
   - Upload zip file
   - Fill in store listing
   - Submit for review

## 7. Custom Domain

In Vercel Dashboard:
1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS setup instructions
4. Wait for SSL certificate

## 8. Monitoring & Maintenance

- Monitor errors: Vercel Dashboard → Logs
- Check analytics: Vercel Dashboard → Analytics
- Update dependencies: `npm update`
- Security audits: `npm audit`

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)

## Getting Help

- Check logs: `vercel logs <project-name>`
- Review GitHub issues
- Check deployment status in Vercel dashboard
