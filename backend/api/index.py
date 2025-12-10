"""
Vercel serverless handler for Flask app.
"""
from app import app

# Vercel expects a handler that takes (request, context) or just works with WSGI
def handler(environ, start_response):
    """WSGI handler for Vercel"""
    return app.wsgi_app(environ, start_response)