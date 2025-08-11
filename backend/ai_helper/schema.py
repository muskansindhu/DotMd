from pydantic import BaseModel, Field

class ReadmeStructure(BaseModel):
    overview: str = Field(..., description="A clear and concise description of the project.")
    features: str = Field(..., description="A list of key features and functionalities.")
    installation: str = Field(..., description="Step-by-step instructions for installing the project.")
    usage: str = Field(..., description="Examples and instructions on how to use the project.")
    technologies: str = Field(..., description="A list of main technologies and programming languages used.")
    configuration: str = Field(..., description="Information on configuration, environment variables, etc.")
    requirements: str = Field(..., description="Prerequisites needed to run the project.")
    contributing: str = Field(..., description="Guidelines for contributing to the project.")
    documentation: str = Field(..., description="Links or instructions for more detailed documentation.")
    acknowledgements: str = Field(..., description="Credits and acknowledgements.")
    changelog: str = Field(..., description="A summary of changes based on commit history.")
