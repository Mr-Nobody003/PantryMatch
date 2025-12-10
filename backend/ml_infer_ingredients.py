"""
Inference utilities for the trained ingredient classifier (ResNet18).

Loads:
  backend/models/ingredients_resnet18.pt
  Or downloads from GitHub releases if not found locally (Vercel)

Provides:
  - load_model()
  - predict_ingredients_from_bytes(image_bytes, top_k=5)

Usage example (from Python, after training):

  from ml_infer_ingredients import load_model, predict_ingredients_from_bytes

  model, class_names, device = load_model()
  with open("some_image.jpg", "rb") as f:
      image_bytes = f.read()
  preds = predict_ingredients_from_bytes(model, class_names, device, image_bytes, top_k=5)
  print(preds)  # List[{"name": ..., "prob": ...}, ...]
"""

from __future__ import annotations

import io
import os
from pathlib import Path
from typing import List, Dict
from urllib.request import urlretrieve

import torch
from PIL import Image
from torchvision import transforms, models


MODELS_DIR = Path(__file__).resolve().parent / "models"
MODEL_PATH = MODELS_DIR / "ingredients_resnet18.pt"

# GitHub raw content URL for model download
# Replace with your actual GitHub repo details
GITHUB_MODEL_URL = "https://github.com/Mr-Nobody003/PantryMatch/releases/download/v1.0/ingredients_resnet18.pt"


def download_model_from_github(url: str, dest_path: Path) -> None:
    """
    Download model from GitHub releases if it doesn't exist locally.
    """
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"Downloading model from {url}...")
    try:
        urlretrieve(url, dest_path)
        print(f"Model downloaded successfully to {dest_path}")
    except Exception as e:
        raise FileNotFoundError(
            f"Failed to download model from GitHub: {e}. "
            f"Make sure the URL is correct and the release exists."
        )


def load_model():
    """
    Load the trained ResNet18 model and class names.
    
    If model doesn't exist locally, downloads from GitHub releases (Vercel only).
    For local development, model must exist at backend/models/ingredients_resnet18.pt

    Returns:
      model: torch.nn.Module
      class_names: List[str]
      device: torch.device
    """
    # If model doesn't exist, try to download from GitHub (only on Vercel/production)
    if not MODEL_PATH.exists():
        # Check if running on Vercel (has VERCEL env var)
        is_vercel = os.getenv("VERCEL") == "1"
        
        if is_vercel:
            print(f"Model not found at {MODEL_PATH}. Attempting to download from GitHub...")
            download_model_from_github(GITHUB_MODEL_URL, MODEL_PATH)
        else:
            raise FileNotFoundError(
                f"Model file not found at {MODEL_PATH}. "
                f"For local development, train the model first using: "
                f"python ml_train_ingredients_model.py"
            )

    checkpoint = torch.load(MODEL_PATH, map_location="cpu")
    class_names = checkpoint.get("class_names")
    if class_names is None:
        raise ValueError("class_names not found in checkpoint.")

    num_classes = len(class_names)
    # Build model with same architecture as in training
    model = models.resnet18(weights=None)
    in_features = model.fc.in_features
    model.fc = torch.nn.Linear(in_features, num_classes)

    model.load_state_dict(checkpoint["model_state_dict"])

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    model.eval()

    return model, class_names, device


def _build_transform():
    """
    Build the same normalization as training (ImageNet stats).
    """
    mean = [0.485, 0.456, 0.406]
    std = [0.229, 0.224, 0.225]
    return transforms.Compose(
        [
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean, std),
        ]
    )


def predict_ingredients_from_bytes(
    model,
    class_names: List[str],
    device,
    image_bytes: bytes,
    top_k: int = 5,
) -> List[Dict[str, float]]:
    """
    Run inference on a single image given as raw bytes.

    Returns:
      List of dicts: [{\"name\": ingredient_name, \"prob\": probability}, ...] sorted by prob desc.
    """
    transform = _build_transform()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = transform(image).unsqueeze(0).to(device)  # (1, C, H, W)

    with torch.no_grad():
        outputs = model(tensor)
        probs = torch.softmax(outputs, dim=1).cpu().numpy()[0]

    # Get top_k predictions
    top_k = min(top_k, len(class_names))
    indices = probs.argsort()[::-1][:top_k]

    results: List[Dict[str, float]] = []
    for idx in indices:
        results.append(
            {
                "name": class_names[idx],
                "prob": float(probs[idx]),
            }
        )
    return results


