from pydantic import BaseModel, ConfigDict


class SiteCreate(BaseModel):
    company_id: int
    site_code: str
    name: str
    address: str | None = None
    required_guards: int = 1


class SiteOut(SiteCreate):
    id: int
    status: bool

    model_config = ConfigDict(from_attributes=True)
