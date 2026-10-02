from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.attendance_upload import AttendanceUpload
from app.models.site import Site

router = APIRouter(prefix="/attendance-uploads", tags=["Attendance Uploads"])

UPLOAD_DIR = Path("uploads/attendance")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("")
async def upload_attendance_sheet(
    site_id: int = Form(...),
    period: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not db.get(Site, site_id):
        raise HTTPException(404, "Site not found")

    allowed = {".jpg", ".jpeg", ".png", ".webp", ".pdf"}
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in allowed:
        raise HTTPException(400, "Only JPG, JPEG, PNG, WEBP and PDF are allowed")

    filename = f"{uuid4().hex}{suffix}"
    destination = UPLOAD_DIR / filename
    data = await file.read()
    destination.write_bytes(data)

    record = AttendanceUpload(
        site_id=site_id,
        period=period,
        filename=file.filename or filename,
        stored_path=str(destination),
        status="UPLOADED",
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "id": record.id,
        "site_id": site_id,
        "period": period,
        "filename": record.filename,
        "status": record.status,
        "message": "Attendance sheet uploaded. OCR verification stage is next.",
    }
