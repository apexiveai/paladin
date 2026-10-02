from calendar import monthrange
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.attendance import AttendanceRecord
from app.models.payroll import PayrollRecord
from app.models.worker import Worker
from app.schemas.payroll import PayrollCalculateRequest

router = APIRouter(prefix="/payroll", tags=["Payroll"])


@router.post("/calculate")
def calculate_payroll(payload: PayrollCalculateRequest, db: Session = Depends(get_db)):
    worker = db.get(Worker, payload.worker_id)
    if not worker:
        raise HTTPException(404, "Worker not found")

    salary = (
        payload.monthly_salary
        if payload.monthly_salary is not None
        else Decimal(str(worker.base_salary))
    )

    records = (
        db.query(AttendanceRecord)
        .filter(
            AttendanceRecord.worker_id == payload.worker_id,
            AttendanceRecord.date >= payload.period_start,
            AttendanceRecord.date <= payload.period_end,
        )
        .all()
    )

    present_days = Decimal("0")
    half_days = Decimal("0")
    absent_days = Decimal("0")

    for record in records:
        if record.status == "PRESENT":
            present_days += Decimal("1")
        elif record.status == "HALF_DAY":
            half_days += Decimal("1")
        elif record.status == "ABSENT":
            absent_days += Decimal("1")

    payable_days = present_days + (half_days * Decimal("0.5"))

    total_calendar_days = Decimal(
        str((payload.period_end - payload.period_start).days + 1)
    )
    daily_rate = salary / total_calendar_days if total_calendar_days else Decimal("0")
    earned_salary = daily_rate * payable_days

    allowance = payload.allowance
    overtime = payload.overtime
    deduction = salary - earned_salary
    if deduction < 0:
        deduction = Decimal("0")

    net_salary = earned_salary + allowance + overtime

    result = {
        "worker_id": worker.id,
        "worker_code": worker.worker_code,
        "worker_name": worker.name,
        "period_start": payload.period_start,
        "period_end": payload.period_end,
        "base_salary": salary,
        "present_days": present_days,
        "half_days": half_days,
        "absent_days": absent_days,
        "payable_days": payable_days,
        "daily_rate": daily_rate.quantize(Decimal("0.01")),
        "earned_salary": earned_salary.quantize(Decimal("0.01")),
        "deduction": deduction.quantize(Decimal("0.01")),
        "allowance": allowance,
        "overtime": overtime,
        "net_salary": net_salary.quantize(Decimal("0.01")),
    }

    return result
