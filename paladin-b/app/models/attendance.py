from datetime import date

from sqlalchemy import Date, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    __table_args__ = (
        UniqueConstraint("worker_id", "date", name="uq_worker_attendance_date"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    site_id: Mapped[int] = mapped_column(ForeignKey("sites.id"), index=True)
    date: Mapped[date] = mapped_column(Date, index=True)
    status: Mapped[str] = mapped_column(String(30), default="PRESENT")
    source: Mapped[str] = mapped_column(String(30), default="MANUAL")
    notes: Mapped[str | None] = mapped_column(String(500), nullable=True)

    worker = relationship("Worker", back_populates="attendance_records")
    site = relationship("Site", back_populates="attendance_records")
