# Vercel Deployment Checklist

## Prerequisites
- [ ] Push all changes to GitHub (GitHub → Vercel integration required)
- [ ] Verify `.gitignore` allows `backend/data/final_recipes.csv` and `backend/models/ingredients_resnet18.pt`
- [ ] Check file sizes:
  - `backend/data/final_recipes.csv` < 50 MB ✓
  - `backend/models/ingredients_resnet18.pt` < 50 MB ✓

## Vercel Dashboard Setup

### 1. Create/Import Project
- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- **Import existing Git repository** (select your GitHub repo)
- Framework: Select **Other** (custom)
- **Root directory: `./backend`** ← Deploy only the backend folder

### 2. Configure Environment Variables
In **Settings → Environment Variables**, add:

```
OPENROUTER_API_KEY=<your-api-key>
OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
OPENROUTER_MODEL=openai/gpt-4o-mini
RAPIDAPI_KEY=<your-api-key>
RAPIDAPI_HOST=youtube-v3-alternative.p.rapidapi.com
```

### 3. Build Settings
- **Build Command**: `pip install -r requirements.txt`
- **Output Directory**: `.` (leave default)

## Troubleshooting

### Build Fails: Module Not Found
- Ensure `api/index.py` has correct import: `from app import app`
- Verify `vercel.json` is in the `backend/` folder
- Check that `app.py` is also in `backend/`

### 502 Errors / Function Timeout
- Increase `maxDuration` in `vercel.json` (currently 60s)
- Increase `memory` (currently 3008 MB)
- Check that PyTorch model loads successfully: verify `models/ingredients_resnet18.pt` exists

### CSV Not Found
- Verify file exists: `backend/data/final_recipes.csv`
- Check `.gitignore` doesn't block it
- Ensure path in `app.py` uses `Path(__file__).resolve().parent / "data"`

### API Keys Not Working
- Verify env vars are set in Vercel dashboard (not just locally)
- Redeploy after adding env vars
- Check Vercel logs: **Deployments → Select → Logs**

## Production URLs

Once deployed:
- **Flask API**: `https://<your-vercel-domain>.vercel.app/`
- **Search endpoint**: `https://<your-vercel-domain>.vercel.app/search?q=tomato`
- **Classify endpoint**: `POST https://<your-vercel-domain>.vercel.app/classify-image`

## Post-Deployment
- [ ] Test `/search?q=rice` endpoint
- [ ] Test `/videos?recipe=rice` endpoint  
- [ ] Test `/classify-image` with a test image
- [ ] Test `/adapt` endpoint with missing ingredient
- [ ] Check Vercel logs for any warnings/errors
