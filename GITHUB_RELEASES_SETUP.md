# GitHub Model Release Setup

To use the runtime model download feature, follow these steps:

## 1. Upload Your Model to GitHub Releases

### Option A: Manual Upload (Quick)
1. Go to your GitHub repo: https://github.com/Mr-Nobody003/PantryMatch
2. Click **Releases** on the right sidebar
3. Click **Create a new release**
4. Fill in:
   - Tag version: `v1.0`
   - Release title: `Model Release v1.0`
   - Description: `Initial ingredient classification model`
5. Drag & drop `backend/models/ingredients_resnet18.pt` into the release
6. Click **Publish release**

### Option B: Automated Upload (GitHub Actions)
The `.github/workflows/release.yml` workflow will auto-upload whenever the model file changes. Just push:
```bash
git add backend/models/ingredients_resnet18.pt
git commit -m "Add initial model"
git push
```

## 2. Update the Download URL in Code

In `backend/ml_infer_ingredients.py`, update this line with your actual GitHub release URL:

```python
GITHUB_MODEL_URL = "https://github.com/Mr-Nobody003/PantryMatch/releases/download/v1.0/ingredients_resnet18.pt"
```

Replace:
- `Mr-Nobody003` → your GitHub username
- `PantryMatch` → your repo name
- `v1.0` → release tag
- `ingredients_resnet18.pt` → model filename

## 3. Test Runtime Download

Run locally to verify the download works:
```bash
# Delete local model to test download
rm backend/models/ingredients_resnet18.pt

# Run Flask app - it will download the model
python backend/app.py
```

You should see:
```
Model not found. Attempting to download from GitHub...
Downloading model from https://github.com/Mr-Nobody003/PantryMatch/releases/download/v1.0/ingredients_resnet18.pt...
Model downloaded successfully to backend/models/ingredients_resnet18.pt
```

## 4. Deploy to Vercel

Now the `backend/` folder is small enough to deploy:
- ✅ PyTorch CPU-only (~500 MB savings)
- ✅ Model downloads on first request (~1-2 seconds)
- ✅ Total memory usage: ~1.2 GB (fits in 2048 MB limit)

```bash
git push  # Deploy to Vercel
```

## Notes

- First request to Vercel will be slow (downloads model)
- Subsequent requests will be fast (model cached in memory)
- Model is re-downloaded if Vercel cold-starts a new instance
- No need to commit large `.pt` file to git anymore
