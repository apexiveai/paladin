from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    DATABASE_URL: str = (

        "postgresql://postgres:1234@localhost:5432/security_workforce"

    )
    API_PREFIX: str = "/api"

    APP_NAME: str = "Apexive Workforce API"

    class Config:

        env_file = ".env"

settings = Settings()