# Career Guidance Backend (Node + Express + MongoDB)

## What's inside
- Express server with simple auth (register/login) using JWT
- Mongoose models: User, Career (with roadmap)
- Routes: /api/auth, /api/careers
- Local MongoDB setup by default (see .env.example)

## Quick local setup

1. Copy `.env.example` to `.env` and update values
   ```
   cp .env.example .env
   ```
2. Install packages
   ```
   npm install
   ```
3. Start local MongoDB (if using system service):
   - On Linux/macOS with brew/systemd: `sudo service mongod start` or `brew services start mongodb-community`
   - Or run `mongod` if you have installed locally.
4. Run dev server
   ```
   npm run dev
   ```
5. API endpoints:
   - `GET /` health check
   - `POST /api/auth/register` register { name, email, password, role }
   - `POST /api/auth/login` login { email, password }
   - `GET /api/careers` list careers
   - `POST /api/careers` add career (admin)

## Git - push steps (from repo root)

```
git add backend
git commit -m "Add backend (express + mongoose)"
git push origin main
```

## Deploy notes

- You asked for initial deployment on Vercel. Vercel is optimized for serverless functions; running a long-lived Express server requires either:
  - Converting to Vercel Serverless Functions (adjust code into `api/` functions), or
  - Deploying to a service like Render / Railway / Heroku (recommended) and keeping frontend on Vercel.

- Recommended quick flow:
  1. Deploy this backend to Render (Free tier) or Railway for easy MongoDB + Node deployment.
  2. Keep frontend on Vercel; set `REACT_APP_API_URL` to your backend URL.

## Environment variables
- PORT
- MONGO_URI
- JWT_SECRET

## Next steps you might want
- Add middleware for JWT auth & role-based access
- Add endpoints for progress tracking, resource uploads (S3), admin panel features
- Add validation (Joi) and request rate limiting
