from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.worker import Worker
from app.schemas.worker import WorkerCreate, WorkerOut

router = APIRouter(prefix="/workers", tags=["Workers"])


@router.post("", response_model=WorkerOut)
def create_worker(payload: WorkerCreate, db: Session = Depends(get_db)):
    if db.query(Worker).filter(Worker.worker_code == payload.worker_code).first():
        raise HTTPException(409, "Worker code already exists")
    worker = Worker(**payload.model_dump())
    db.add(worker)
    db.commit()
    db.refresh(worker)
    return worker


@router.get("", response_model=list[WorkerOut])
def list_workers(db: Session = Depends(get_db)):
    return db.query(Worker).order_by(Worker.id.desc()).all()
