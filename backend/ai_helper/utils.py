import re
from typing import Tuple

from .schema import ReadmeStructure
from config import Config


def parse_repo_url(repo_url: str) -> Tuple[str, str]:
    """Extract owner and repo name from various GitHub URL formats."""
    if not repo_url:
        raise ValueError("Repository URL cannot be empty")
    
    repo_url = repo_url.strip()
    
    patterns = [
        r'^https?://github\.com/([^/\s]+)/([^/\s]+?)(?:\.git)?(?:/.*)?/?$',
        r'^git@github\.com:([^/\s]+)/([^/\s]+?)(?:\.git)?$',
        r'^([^/\s]+)/([^/\s]+?)(?:\.git)?$',
        r'^https?://github\.com/([^/\s]+)/([^/\s]+?)(?:\.git)?(?:/(?:tree|blob|commits?|releases?|issues?|pull|wiki|settings).*)?/?$'
    ]
    
    for pattern in patterns:
        match = re.match(pattern, repo_url, re.IGNORECASE)
        if match:
            owner, repo = match.groups()
            owner = owner.strip()
            repo = repo.strip()
            
            if repo.endswith('.git'):
                repo = repo[:-4]
            
            if not owner or not repo:
                raise ValueError(f"Invalid owner or repository name extracted from: {repo_url}")
            
            valid_chars = re.compile(r'^[a-zA-Z0-9._-]+$')
            if not valid_chars.match(owner) or not valid_chars.match(repo):
                raise ValueError(f"Invalid characters in owner '{owner}' or repository '{repo}' name")
            
            return owner, repo
    
    raise ValueError(f"Invalid GitHub repository URL format: {repo_url}")

def convert_to_markdown(readme_obj: ReadmeStructure) -> str:
    """Convert ReadmeStructure object to markdown format"""
    markdown_content = f"""

{readme_obj.overview}


{readme_obj.features}


{readme_obj.installation}


{readme_obj.usage}


{readme_obj.technologies}


{readme_obj.configuration}


{readme_obj.requirements}


{readme_obj.contributing}


{readme_obj.documentation}


{readme_obj.acknowledgements}


{readme_obj.changelog}
"""
    return markdown_content

def to_emoji_mapped(data):
    """Map provided data to an emoji-enhanced format."""
    if hasattr(data, "model_dump"):
        data = data.model_dump()
    return {Config.EMOJI_KEYS[k]: data.get(k, "") for k in Config.EMOJI_KEYS}