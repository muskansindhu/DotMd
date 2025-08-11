import os 
import requests
from config import Config


def get_repository_structure(owner: str, repo: str, path: str = '') -> dict:
    """    Fetches the structure of a GitHub repository including files and directories.
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository.
        path (str): The path within the repository to fetch. Defaults to the root.
    Returns:
        dict: A dictionary containing the structure of the repository.
    """

    repo_content = dict()
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",
    }

    readable_extensions = {'.txt', '.md', '.py', '.js', '.java', '.cpp', '.c', '.go', '.rs', '.sh', 
                           '.json', '.yaml', '.yml', '.toml', '.ini', '.cfg'}
    readable_filenames = {'LICENSE', 'README', 'README.md'}

    url = f'https://api.github.com/repos/{owner}/{repo}/contents/{path}'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        for item in response.json():
            item_data = {
                'type': item['type'],
                'path': item['path'],
                'html_url': item.get('html_url', None),
            }

            if item['type'] == 'dir':
                # Recursively searches the contents of the directory
                item_data['contents'] = get_repository_structure(owner, repo, item['path'])

            elif item['type'] == 'file':
                filename = item['name']
                _, ext = os.path.splitext(filename)

                # Check whether to read the content
                if ext.lower() in readable_extensions or filename in readable_filenames:
                    raw_url = f'https://raw.githubusercontent.com/{owner}/{repo}/main/{item["path"]}'
                    file_response = requests.get(raw_url, headers=headers)
                    if file_response.status_code == 200:
                        item_data['content_preview'] = file_response.text[:10000]  # 10k chars limit
                    else:
                        item_data['content_preview'] = f"Failed to fetch content: {file_response.status_code}"

            repo_content[item['name']] = item_data

        return repo_content
    else:
        raise Exception(f"Failed to fetch repository structure: {response.status_code} - {response.text}")

def get_repository_info(owner: str, repo: str) -> dict:
    """Fetches basic information about a GitHub repository.
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository.
    Returns:
        dict: A dictionary containing basic information about the repository.
    """

    url = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",
        }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:

        repository_info = response.json()
        repo_details = {
            "repo_name": repository_info.get("name"),
            "owner_name": repository_info.get("owner", {}).get("login"),
            "description": repository_info.get("description"),
            "url": repository_info.get("html_url"),
            "created_at": repository_info.get("created_at"),
            "updated_at": repository_info.get("updated_at"),
        }
        return repo_details
    else:
        raise Exception(f"Failed to fetch repository details: {response.status_code} - {response.text}")
    
def get_repository_languages(owner: str, repo: str) -> list:
    """Fetches the programming languages used in a GitHub repository.
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository.
    Returns:
        list: A list of programming languages used in the repository.
    """
    
    url = f"https://api.github.com/repos/{owner}/{repo}/languages"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        lang_list = []
        for lang in response.json():
            lang_list.append(lang)
        return lang_list
    else:
        raise Exception(f"Failed to fetch repository languages: {response.status_code} - {response.text}")

def get_repository_branches(owner: str, repo: str) -> list[dict]: 
    """Fetches the branches of a GitHub repository.
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository.
    Returns:
        list[dict]: A list of dictionaries containing branch information.
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/branches"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        branch_list = []
        for branch in response.json():
            branch_name = branch['name']
            branch_commit_sha = branch['commit']['sha']
            
            branch_info = {
                "name": branch_name,
                "commit_sha": branch_commit_sha,
                "url": branch['commit']['url'],
            }
            branch_list.append(branch_info)
        return branch_list

    else:   
        raise Exception(f"Failed to fetch repository branches: {response.status_code} - {response.text}")

def get_repository_commits(owner: str, repo: str)-> dict:
    """Fetches the commit history of a GitHub repository.
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository.
    Returns:
        dict: A dictionary containing commit information with commit SHA as keys.
    """

    commits = dict()

    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",
    }
    url = f'https://api.github.com/repos/{owner}/{repo}/commits'
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        for commit in response.json():
            commits[commit['sha']] = {
                'message': commit['commit']['message'],
                'author': commit['commit']['author']['name'],
                'date': commit['commit']['author']['date']
            }
        return commits
    else:
        raise Exception(f"Failed to fetch repository commits: {response.status_code} - {response.text}")

def get_repository_contributors(owner: str, repo: str) -> list[dict]:
    """Fetches the contributors of a GitHub repository. 
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository.
    Returns:
        list[dict]: A list of dictionaries containing contributor information.
    """

    url = f"https://api.github.com/repos/{owner}/{repo}/contributors"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",
    }       

    response = requests.get(url, headers=headers)

    if response.status_code == 200:         
        contributors = response.json()
        contributor_list = []
        for contributor in contributors:
            contributor_info = {
                "username": contributor.get("login"),
                "contributions": contributor.get("contributions"),
                "html_url": contributor.get("html_url"),
            }
            contributor_list.append(contributor_info)
        return contributor_list
    else:
        raise Exception(f"Failed to fetch repository contributors: {response.status_code} - {response.text}")

def get_repository_tags(owner: str, repo: str) -> list[dict]:
    """Fetches the tags of a GitHub repository.
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository.
    Returns:
        list[dict]: A list of dictionaries containing tag information.
    """

    url = f'https://api.github.com/repos/{owner}/{repo}/tags'
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",
    }       
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

def get_repository_releases(owner: str, repo: str) -> list[dict]:
    """Fetches the releases of a GitHub repository.
    Args:
        owner (str): The owner of the repository.
        repo (str): The name of the repository. 
    Returns:
        list[dict]: A list of dictionaries containing release information.
    """
    
    url = f'https://api.github.com/repos/{owner}/{repo}/releases'
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {Config.GITHUB_TOKEN}",      
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        releases = response.json()
        release_list = []
        for release in releases:
            release_info = {
                "tag_name": release.get("tag_name"),
                "name": release.get("name"),
                "body": release.get("body"),
                "created_at": release.get("created_at"),
                "published_at": release.get("published_at"),
                "html_url": release.get("html_url"),
            }
            release_list.append(release_info)
        return release_list
    else:
        raise Exception(f"Failed to fetch repository releases: {response.status_code} - {response.text}")   
    
