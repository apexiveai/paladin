from datetime import date
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class WorkerCreate(BaseModel):
    worker_code: str
    name: str
    phone: str | None = None
    nrc: str | None = None
    position: str = "Security Guard"
    base_salary: Decimal = Decimal("0")
    join_date: date | None = None


class WorkerOut(WorkerCreate):
    id: int
    status: bool

    model_config = ConfigDict(from_attributes=True)
