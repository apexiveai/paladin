from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.attendance import AttendanceRecord
from app.models.site import Site
from app.models.worker import Worker
from app.schemas.attendance import AttendanceCreate, AttendanceOut

router = APIRouter(prefix="/attendance", tags=["Attendance"])

VALID_STATUS = {"PRESENT", "ABSENT", "HALF_DAY", "LEAVE", "OFF"}


@router.post("", response_model=AttendanceOut)
def create_attendance(payload: AttendanceCreate, db: Session = Depends(get_db)):
    if payload.status not in VALID_STATUS:
        raise HTTPException(400, f"Invalid status. Use one of: {sorted(VALID_STATUS)}")
    if not db.get(Worker, payload.worker_id):
        raise HTTPException(404, "Worker not found")
    if not db.get(Site, payload.site_id):
        raise HTTPException(404, "Site not found")

    record = (
        db.query(AttendanceRecord)
        .filter(
            AttendanceRecord.worker_id == payload.worker_id,
            AttendanceRecord.date == payload.date,
        )
        .first()
    )

    if record:
        for key, value in payload.model_dump().items():
            setattr(record, key, value)
    else:
        record = AttendanceRecord(**payload.model_dump())
        db.add(record)

    db.commit()
    db.refresh(record)
    return record


@router.get("", response_model=list[AttendanceOut])
def list_attendance(
    worker_id: int | None = None,
    month: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(AttendanceRecord)

    if worker_id:
        query = query.filter(AttendanceRecord.worker_id == worker_id)

    if month:
        try:
            year, month_number = map(int, month.split("-"))
            start = date(year, month_number, 1)
            if month_number == 12:
                end = date(year + 1, 1, 1)
            else:
                end = date(year, month_number + 1, 1)
            query = query.filter(
                AttendanceRecord.date >= start,
                AttendanceRecord.date < end,
            )
        except ValueError:
            raise HTTPException(400, "month must use YYYY-MM format")

    return query.order_by(AttendanceRecord.date.asc()).all()
