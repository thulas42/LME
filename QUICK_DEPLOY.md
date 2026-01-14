# Quick Deployment Guide - CreditEdge

Deploy your app in 10 minutes! 🚀

## What You'll Get

- **Frontend URL**: `https://your-app.vercel.app` (shareable link)
- **Backend URL**: `https://your-api.onrender.com` (API endpoint)

## Step 1: Push to GitHub (2 min)

```bash
# If you haven't already
git init
git add .
git commit -m "Ready for deployment"
git branch -M main

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Deploy Backend to Render (5 min)

1. **Go to**: https://render.com → Sign up (free)
2. **Click**: "New +" → "Web Service"
3. **Connect**: Your GitHub repository
4. **Configure**:
   - Name: `creditedge-api` (or any name)
   - Environment: `Node`
   - Build Command: `cd server && npm install && npm run build`
   - Start Command: `cd server && npm start`
   - Plan: **Free**
5. **Add Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
6. **Click**: "Create Web Service"
7. **Wait**: 5-10 minutes for first deployment
8. **Copy**: Your service URL (e.g., `https://creditedge-api-xyz.onrender.com`)

## Step 3: Deploy Frontend to Vercel (3 min)

1. **Go to**: https://vercel.com → Sign up (free)
2. **Click**: "Add New..." → "Project"
3. **Import**: Your GitHub repository
4. **Configure**:
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build:react`
   - Output Directory: `dist`
5. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://YOUR_RENDER_URL/api` (replace with your Render URL from Step 2)
6. **Click**: "Deploy"
7. **Wait**: 2-5 minutes
8. **Copy**: Your deployment URL (e.g., `https://creditedge.vercel.app`)

## Step 4: Test It! 🎉

1. Visit your Vercel URL
2. The app should load and connect to your backend
3. Try creating a deal, viewing listings, etc.
4. Check backend health: `YOUR_RENDER_URL/api/health`
5. View API docs: `YOUR_RENDER_URL/api-docs`

## That's It!

Your app is now live and accessible from anywhere in the world! Share the Vercel URL with anyone.

## Troubleshooting

**Frontend shows errors?**
- Check Vercel deployment logs
- Verify `VITE_API_URL` is set correctly
- Make sure backend URL ends with `/api`

**Backend not responding?**
- Render free tier spins down after 15 min inactivity
- First request after spin-down takes 30-60 seconds
- Check Render logs for errors

**CORS errors?**
- Backend is already configured for CORS
- If issues persist, check Render logs

## Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Check `DEPLOYMENT.md` for detailed instructions
