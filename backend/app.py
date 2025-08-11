from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pydantic import BaseModel
from google import genai
import os
import json
from ai_helper.generator import ReadmeGenerator

load_dotenv()

gemini_key = os.getenv("GEMINI_API_KEY")

class AISuggestion(BaseModel):
    section_name: str
    section_content: str

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"], methods=["POST", "OPTIONS"], allow_headers=["Content-Type"])

@app.route("/")
def index():
    return "Hello World"

@app.route("/ai-section-suggestion", methods=["POST", "OPTIONS"])
def ai_suggestion():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight OK"}), 200

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

@app.route("/ai-readme-suggestion", methods=["POST", "OPTIONS"])
def ai_readme_suggestion():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight OK"}), 200

    generator = ReadmeGenerator()

    data = request.get_json()
    repo_url = data.get("repo_url", "")
    
    readme_sections = generator.generate_readme(repo_url)
    return {"readme": readme_sections}



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
