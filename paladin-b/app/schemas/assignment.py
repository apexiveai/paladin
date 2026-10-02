from datetime import date

from pydantic import BaseModel, ConfigDict


class AssignmentCreate(BaseModel):
    worker_id: int
    company_id: int
    site_id: int
    start_date: date
    end_date: date | None = None
    shift: str = "DAY"


class AssignmentOut(AssignmentCreate):
    id: int
    status: str

    model_config = ConfigDict(from_attributes=True)
