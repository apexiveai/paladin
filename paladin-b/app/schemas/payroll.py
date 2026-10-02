from datetime import date
from decimal import Decimal

from pydantic import BaseModel


class PayrollCalculateRequest(BaseModel):
    worker_id: int
    period_start: date
    period_end: date
    monthly_salary: Decimal | None = None
    allowance: Decimal = Decimal("0")
    overtime: Decimal = Decimal("0")
