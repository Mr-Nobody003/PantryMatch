"""
Vercel serverless handler for Flask app.
"""
from app import app

# This is the correct way - Vercel's Python runtime expects this
handler = app