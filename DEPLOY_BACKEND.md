# Deploy Backend to Render (2 minutes)

Your frontend is already deployed at: **https://creditedge.vercel.app**

Now deploy the backend:

## Quick Steps:

1. **Go to**: https://render.com → Sign up/Login (free)

2. **Click**: "New +" → "Web Service"

3. **Connect GitHub**: Select your repository

4. **Configure**:
   - **Name**: `creditedge-api`
   - **Environment**: `Node`
   - **Root Directory**: `server` (important!)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

5. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`

6. **Click**: "Create Web Service"

7. **Wait**: 5-10 minutes for first deployment

8. **Copy your backend URL** (e.g., `https://creditedge-api.onrender.com`)

9. **Update Frontend** with backend URL:
   ```bash
   vercel env add VITE_API_URL production
   # When prompted, enter: https://YOUR_RENDER_URL/api
   ```

10. **Redeploy frontend**:
    ```bash
    vercel --prod
    ```

## That's it! Your app will be fully functional! 🎉
