from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.assignment import Assignment
from app.models.company import Company
from app.models.site import Site
from app.models.worker import Worker
from app.schemas.assignment import AssignmentCreate, AssignmentOut

router = APIRouter(prefix="/assignments", tags=["Assignments"])


@router.post("", response_model=AssignmentOut)
def create_assignment(payload: AssignmentCreate, db: Session = Depends(get_db)):
    if not db.get(Worker, payload.worker_id):
        raise HTTPException(404, "Worker not found")
    if not db.get(Company, payload.company_id):
        raise HTTPException(404, "Company not found")
    if not db.get(Site, payload.site_id):
        raise HTTPException(404, "Site not found")

    assignment = Assignment(**payload.model_dump())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


@router.get("", response_model=list[AssignmentOut])
def list_assignments(db: Session = Depends(get_db)):
    return db.query(Assignment).order_by(Assignment.id.desc()).all()
