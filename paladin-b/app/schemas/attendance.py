from datetime import date

from pydantic import BaseModel, ConfigDict


class AttendanceCreate(BaseModel):
    worker_id: int
    site_id: int
    date: date
    status: str = "PRESENT"
    source: str = "MANUAL"
    notes: str | None = None


class AttendanceOut(AttendanceCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
