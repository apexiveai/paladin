from datetime import date

from sqlalchemy import Boolean, Date, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Worker(Base):
    __tablename__ = "workers"

    id: Mapped[int] = mapped_column(primary_key=True)
    worker_code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    nrc: Mapped[str | None] = mapped_column(String(100), nullable=True)
    position: Mapped[str] = mapped_column(String(100), default="Security Guard")
    base_salary: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    join_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[bool] = mapped_column(Boolean, default=True)

    assignments = relationship("Assignment", back_populates="worker")
    attendance_records = relationship("AttendanceRecord", back_populates="worker")
    payroll_records = relationship("PayrollRecord", back_populates="worker")
