from pydantic import BaseModel, ConfigDict


class CompanyCreate(BaseModel):
    company_code: str
    name: str
    contact_name: str | None = None
    phone: str | None = None
    address: str | None = None


class CompanyOut(CompanyCreate):
    id: int
    status: bool

    model_config = ConfigDict(from_attributes=True)
