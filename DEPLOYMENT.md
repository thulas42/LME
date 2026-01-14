# CreditEdge Deployment Guide

This guide will help you deploy CreditEdge to free hosting services so it can be accessed from anywhere in the world.

## Deployment Strategy

- **Frontend (React)**: Deploy to Vercel (free tier)
- **Backend (Express API)**: Deploy to Render (free tier)

## Prerequisites

1. GitHub account
2. Vercel account (free) - Sign up at https://vercel.com
3. Render account (free) - Sign up at https://render.com

## Step 1: Push Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 2: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `creditedge-api`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render uses this port)
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy the service URL** (e.g., `https://creditedge-api.onrender.com`)

## Step 3: Update Frontend API URL

Once your backend is deployed, update the frontend to use the deployed backend URL:

1. Create a `.env.production` file in the root directory:
```bash
VITE_API_URL=https://YOUR_RENDER_URL/api
```

Replace `YOUR_RENDER_URL` with your actual Render service URL.

## Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build:react`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://YOUR_RENDER_URL/api`
6. Click "Deploy"
7. Wait for deployment (2-5 minutes)
8. **Copy the deployment URL** (e.g., `https://creditedge.vercel.app`)

## Step 5: Update CORS on Backend (if needed)

If you encounter CORS errors, the backend should already be configured to allow all origins. If not, the CORS middleware in `server/src/index.ts` should handle it.

## Alternative: Deploy Backend to Railway

If Render doesn't work, you can use Railway (also free):

1. Go to https://railway.app and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add a service → "Empty Service"
5. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Add Environment Variable:
   - `PORT` = (Railway will auto-assign, but you can set it)
7. Deploy and copy the URL

## Testing Your Deployment

1. Visit your Vercel frontend URL
2. Open browser DevTools (F12) → Network tab
3. Try using the app - check that API calls go to your Render backend
4. Visit `YOUR_RENDER_URL/api-docs` to see Swagger documentation
5. Visit `YOUR_RENDER_URL/api/health` to check backend health

## Important Notes

- **Free tier limitations**:
  - Render free tier: Services spin down after 15 minutes of inactivity (first request may be slow)
  - Vercel free tier: Generous limits, no spin-down
- **Database**: The JSON file-based database will persist on Render's filesystem
- **Updates**: Push to GitHub to trigger automatic redeployment on both platforms

## Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify the PORT environment variable is set correctly
- Ensure the build completed successfully

### CORS errors
- Verify CORS is enabled in `server/src/index.ts`
- Check that the frontend URL is allowed

### Frontend can't connect to backend
- Verify `VITE_API_URL` environment variable is set correctly in Vercel
- Check that the backend URL is accessible (visit it in a browser)

## Quick Deploy Commands

After initial setup, updates are automatic via GitHub:

```bash
# Make changes
git add .
git commit -m "Update app"
git push
# Both Vercel and Render will auto-deploy
```
