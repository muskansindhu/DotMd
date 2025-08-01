import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pydantic import BaseModel
from google import genai


load_dotenv()

gemini_key = os.getenv("GEMINI_API_KEY")

class AISuggestion(BaseModel):
    section_name: str
    section_content: str

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Hello World"

@app.route("/ai-suggestion", methods=["POST"])
def ai_suggestion():
    data = request.get_json()
    section_details = data.get("section_details", "")

    prompt = f"""
    You are an AI assistant designed to assist users in crafting sections for their README files.
    Please generate a sample text block suitable for inclusion in a README.

    Section Details: {section_details}
    """

    client = genai.Client()
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
        "response_mime_type": "application/json",
        "response_schema": AISuggestion,
    },
    )

    parsed = json.loads(response.text)

    return jsonify(parsed)

if __name__ == "__main__":
    app.run()