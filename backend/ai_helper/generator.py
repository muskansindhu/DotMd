import os
import re
import json
from .schema import ReadmeStructure
from .github_helper import (
    get_repository_info,
    get_repository_structure,
    get_repository_commits,
    get_repository_contributors,
    get_repository_languages,
    get_repository_branches,
    get_repository_releases,
)
from .utils import parse_repo_url, to_emoji_mapped
from config import Config
from google import genai

class ReadmeGenerator:
    def __init__(self):
        
        os.environ["GOOGLE_API_KEY"] = Config.GEMINI_API_KEY     
        self.model = Config.LLM_MODEL
        self.response_schema = ReadmeStructure
        self.tools = [
            get_repository_info,
            get_repository_structure,
            get_repository_commits,
            get_repository_contributors,
            get_repository_languages,
            get_repository_branches,
            get_repository_releases
        ]
    
    def _llm_prompt(self) -> str:
        """Returns the system prompt for the AI model"""

        system_prompt = f"""You are a GitHub repository analyst and README generator.

Your task is to:
1. Analyze the collected information thoroughly  
2. Generate a comprehensive README structure

## Process:

1. **Analysis Phase**: After gathering all information, analyze:
   - Project purpose and scope
   - Key features and functionality
   - Technical architecture
   - Development workflow
   - Documentation gaps

2. **README Generation Phase**: Create comprehensive README content following the exact schema format.

3. **Output Generation Phase**:
   - Every field MUST be a single JSON string.
   - If you have multiple items (e.g., features, technologies), render them as a Markdown string with one item per line (e.g., '- item 1\\n- item 2'), NOT as a JSON array.


## CRITICAL: Output Format Requirements
When you're ready to generate the README, you MUST return a JSON object with exactly these fields:

{{
  "overview": "detailed project description",
  "features": "key features list",
  "installation": "installation steps",
  "usage": "usage examples",
  "technologies": "tech stack",
  "configuration": "configuration info",
  "requirements": "prerequisites",
  "contributing": "contribution guidelines",
  "documentation": "documentation links",
  "acknowledgements": "credits",
  "changelog": "recent changes"
}}

Do NOT wrap this in any other structure. Return the JSON object directly with these exact field names.

"""

        return system_prompt
    
    def generate_readme(self, repo_url: str) -> ReadmeStructure:
        """Generate README structure using the agent approach"""
        repo_data = {}

        try:
            owner, repo = parse_repo_url(repo_url)
            
            repo_data['info'] = get_repository_info(owner, repo)
            repo_data['structure'] = get_repository_structure(owner, repo)
            repo_data['commits'] = get_repository_commits(owner, repo)
            repo_data['contributors'] = get_repository_contributors(owner, repo)
            repo_data['languages'] = get_repository_languages(owner, repo)
            repo_data['branches'] = get_repository_branches(owner, repo)
            repo_data['releases'] = get_repository_releases(owner, repo)

            repo_data_str = ""

            for key, value in repo_data.items():
                repo_data_str += f"{key.upper()}: {value}\n\n"

            system_message = f"Generate a README structure for the GitHub repository {owner}/{repo}." + f"\n\nRepository Data:\n{repo_data_str}\n\n" + self._llm_prompt()

            client = genai.Client()
            response = client.models.generate_content(
                model=self.model,
                contents=system_message,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": self.response_schema,
                },
            )

            parsed = json.loads(response.text)
            mapped = to_emoji_mapped(parsed)
            return mapped
        
        except Exception as e:
            raise ValueError(f"Failed to generate readme for repository '{repo_url}': {e}")

    