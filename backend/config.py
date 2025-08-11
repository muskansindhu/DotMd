import os
from dotenv import load_dotenv

load_dotenv()

class Config:

    GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    LLM_MODEL = "gemini-2.0-flash-lite"
    EMOJI_KEYS = {
    "overview": "📖 Overview",
    "features": "✨ Features",
    "installation": "🚀 Installation",
    "usage": "🛠️ Usage",
    "technologies": "📦 Technologies",
    "configuration": "🔧 Configuration",
    "requirements": "✅ Requirements",
    "contributing": "🤝 Contributing",
    "documentation": "📄 Documentation",
    "acknowledgements": "❤️ Acknowledgements",
    "changelog": "📝 Changelog",
    }