# Staging Environment Setup Guide

## Overview
This repository now has a **staging** branch for testing changes before deploying to production.

## Branch Structure
- **`main`** → Production (deploys to https://www.yanivgil.co.il)
- **`staging`** → Staging (deploys to Vercel preview/staging URL)

## How to Use

### Option 1: Using the PowerShell Script (Recommended)

```powershell
# Interactive mode - will ask you staging or production
.\commit-and-push.ps1

# Or specify directly:
.\commit-and-push.ps1 -Message "Your commit message" -Target "staging"
.\commit-and-push.ps1 -Message "Your commit message" -Target "production"
```

### Option 2: Manual Git Commands

**For Staging:**
```powershell
git checkout staging
git add .
git commit -m "Your message"
git push origin staging
```

**For Production:**
```powershell
git checkout main
git add .
git commit -m "Your message"
git push origin main
```

## Vercel Configuration

### Setting Up Staging in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to **Settings** → **Git**
3. Under **Production Branch**, ensure it's set to `main`
4. Under **Preview Branches**, add `staging` if needed
5. Vercel will automatically create preview deployments for the `staging` branch

### Vercel URLs

- **Production**: https://www.yanivgil.co.il (from `main` branch)
- **Staging**: https://gilyaniv-staging.vercel.app or check Vercel dashboard for the exact URL

### Custom Domain for Staging (Optional)

If you want a custom staging domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add a subdomain like `staging.yanivgil.co.il`
3. Assign it to the `staging` branch

## Workflow Best Practices

1. **Make changes** on your local machine
2. **Test on staging first:**
   ```powershell
   .\commit-and-push.ps1 -Target "staging"
   ```
3. **Review the staging site** to ensure everything works
4. **Merge to production:**
   ```powershell
   .\commit-and-push.ps1 -Target "production"
   ```
   Or merge staging into main:
   ```powershell
   git checkout main
   git merge staging
   git push origin main
   ```

## Current Branch Status

- **Staging branch**: Created and pushed to GitHub
- **Production branch**: `main` (existing)

## Notes

- The AI assistant will now ask "staging or production?" before committing unless you specify
- Always test on staging before deploying to production
- The staging environment should mirror production as closely as possible
