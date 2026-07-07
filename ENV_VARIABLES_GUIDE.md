# Environment Variables Examples

## Backend (.env file example)

### Development Environment
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxx

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Production Environment (Render/Railway)
```env
# OpenAI Configuration - Keep secure!
OPENAI_API_KEY=sk-proj-prod-key-here

# Server Configuration
PORT=5000
NODE_ENV=production
```

### Testing Environment
```env
# OpenAI Configuration (test key)
OPENAI_API_KEY=sk-proj-test-key-here

# Server Configuration
PORT=5005
NODE_ENV=test
```

---

## Frontend (.env file example)

### Local Development
```env
REACT_APP_API_URL=http://localhost:5000
```

### Staging/Testing
```env
REACT_APP_API_URL=http://staging-api.example.com
```

### Production
```env
REACT_APP_API_URL=https://api.sanskritisetu.com
```

### Alternative Production URLs
```env
# Using Render
REACT_APP_API_URL=https://sanskritisetu-api.onrender.com

# Using Railway
REACT_APP_API_URL=https://sanskritisetu-backend.railway.app

# Using Custom Domain
REACT_APP_API_URL=https://api.sanskritisetu.com
```

---

## Security Best Practices

### ✅ DO:
- Store API keys in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in production
- Rotate API keys periodically
- Use different keys for different environments

### ❌ DON'T:
- Commit `.env` file to GitHub
- Share your API key
- Hardcode API keys in source code
- Use same key for dev & production
- Log or expose API keys

---

## Environment Variables Reference

### Backend

| Variable | Type | Required | Example | Note |
|----------|------|----------|---------|------|
| `OPENAI_API_KEY` | string | Yes | `sk-...xyz` | Your OpenAI secret key |
| `PORT` | number | No | `5000` | Server port (default: 5000) |
| `NODE_ENV` | string | No | `development` | development/production |

### Frontend

| Variable | Type | Required | Example | Note |
|----------|------|----------|---------|------|
| `REACT_APP_API_URL` | string | No | `http://localhost:5000` | Backend API URL |

---

## How to Update .env Files

### Method 1: Text Editor
1. Open `backend/.env`
2. Update values
3. Save file
4. Restart server

### Method 2: Terminal
```bash
# Windows
echo OPENAI_API_KEY=sk-your-key > backend/.env

# Mac/Linux
echo "OPENAI_API_KEY=sk-your-key" > backend/.env
```

### Method 3: Manually (Step by Step)
1. Open file explorer
2. Navigate to `backend` folder
3. Find `.env` file
4. Right-click → Open with → Notepad
5. Edit values
6. Save (Ctrl+S)
7. Restart services

---

## Accessing Environment Variables

### In Node.js/Backend
```javascript
const apiKey = process.env.OPENAI_API_KEY;
const port = process.env.PORT || 5000;
console.log(apiKey);  // sk-...xyz
```

### In React/Frontend
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);  // http://localhost:5000
```

---

## Verifying Environment Variables

### Backend Check
```javascript
// Add this to backend/index.js temporarily
console.log('API Key present:', !!process.env.OPENAI_API_KEY);
console.log('Port:', process.env.PORT);
console.log('Environment:', process.env.NODE_ENV);
```

### Frontend Check
```javascript
// Add this to frontend/src/App.js temporarily
console.log('API URL:', process.env.REACT_APP_API_URL);
```

---

## Troubleshooting Environment Variables

### Problem: Variable not showing up
**Solution:**
1. Restart the development server
2. Verify spelling is exact
3. Check file is saved
4. Verify `.env` is in correct folder

### Problem: API Key not working
**Solution:**
1. Verify key starts with `sk-`
2. Check key is not expired
3. Ensure billing is set up on OpenAI
4. Try a fresh key

### Problem: In production, variables are undefined
**Solution:**
1. Set environment variables in hosting platform
2. For Render: Settings → Environment Variables
3. For Railway: Variables tab
4. Restart the application

---

## .env File Template

```env
# ========================================
# SanskritiSetu - Environment Variables
# =========================================

# OpenAI API Configuration
# Get your key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Add more configuration here
# DATABASE_URL=
# FRONTEND_URL=
# ADMIN_EMAIL=
```

---

## Frontend .env Template

```env
# ========================================
# SanskritiSetu Frontend Configuration
# =========================================

# Backend API URL
# Change based on environment (dev/staging/prod)
REACT_APP_API_URL=http://localhost:5000

# Optional: Add more configuration here
# REACT_APP_ANALYTICS_ID=
# REACT_APP_APP_NAME=SanskritiSetu
```

---

## Git Configuration

### .gitignore setup (Already configured)

Both `backend/.gitignore` and `frontend/.gitignore` contain:
```
.env
.env.local
.env.*.local
```

This prevents accidental commits of `.env` files containing secrets.

### Verify Protection
```bash
# Check if git ignores .env
git check-ignore backend/.env
# Output: backend/.env (if properly configured)
```

---

## Production Deployment Setup

### Step 1: Get Production API Key
1. Create a separate OpenAI account or key for production
2. Set up billing with sufficient balance
3. Note the key

### Step 2: Deploy Backend
**Example: Render**
1. Connect GitHub repository
2. Go to Environment Variables
3. Add: `OPENAI_API_KEY=sk-...production-key...`
4. Add: `NODE_ENV=production`
5. Deploy

### Step 3: Deploy Frontend
**Example: Vercel**
1. Connect GitHub repository
2. Go to Settings → Environment Variables
3. Add: `REACT_APP_API_URL=https://your-backend-url.com`
4. Deploy

---

## Monitoring & Logging

### Backend Logging
```javascript
// Log environment on startup
console.log(`🚀 Server running in ${process.env.NODE_ENV} mode`);
console.log(`📍 Port: ${process.env.PORT}`);
console.log(`🔑 API Key configured: ${!!process.env.OPENAI_API_KEY}`);
```

### Frontend Logging
```javascript
// Log API URL on app start
console.log('API Endpoint:', process.env.REACT_APP_API_URL);
```

---

For more information, see the main [README.md](README.md)
