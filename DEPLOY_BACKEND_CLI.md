# Deploy Backend to Render (Using render.yaml)

Since Render CLI is primarily for macOS/Linux, we'll use Render's GitHub integration which is even easier!

## Option 1: GitHub Integration (Recommended - 2 minutes)

Your `render.yaml` file is already configured! Just:

1. **Make sure your code is pushed to GitHub**:
   ```bash
   git add .
   git commit -m "Add render.yaml for deployment"
   git push
   ```

2. **Go to**: https://render.com → Sign up/Login

3. **Click**: "New +" → "Blueprint"

4. **Connect GitHub**: Select your repository

5. **Render will automatically detect `render.yaml`** and create the service!

6. **Wait**: 5-10 minutes for deployment

7. **Copy your backend URL** from the Render dashboard

8. **Update frontend**:
   ```bash
   vercel env add VITE_API_URL production
   # Enter: https://YOUR_RENDER_URL/api
   vercel --prod
   ```

## Option 2: Manual Web Service (If Blueprint doesn't work)

1. Go to https://render.com → "New +" → "Web Service"
2. Connect GitHub repo
3. Configure:
   - **Name**: `creditedge-api`
   - **Root Directory**: `server`
   - **Build**: `npm install && npm run build`
   - **Start**: `npm start`
   - **Plan**: Free
4. Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
5. Deploy!

## That's it! 🎉
