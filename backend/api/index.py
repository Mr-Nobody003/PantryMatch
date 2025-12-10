"""
Vercel serverless handler for Flask app.
Maps incoming requests to the Flask WSGI application.
"""
from app import app

def handler(request):
    """Vercel Functions handler that wraps the Flask app."""
    return app(request)
