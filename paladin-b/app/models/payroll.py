from datetime import date

from sqlalchemy import Date, ForeignKey, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PayrollRecord(Base):
    __tablename__ = "payroll_records"

    __table_args__ = (
        UniqueConstraint("worker_id", "period_start", name="uq_worker_payroll_period"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    period_start: Mapped[date] = mapped_column(Date, index=True)
    period_end: Mapped[date] = mapped_column(Date)
    base_salary: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    present_days: Mapped[float] = mapped_column(Numeric(6, 2), default=0)
    half_days: Mapped[float] = mapped_column(Numeric(6, 2), default=0)
    absent_days: Mapped[float] = mapped_column(Numeric(6, 2), default=0)
    payable_days: Mapped[float] = mapped_column(Numeric(6, 2), default=0)
    deduction: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    allowance: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    overtime: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    net_salary: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    status: Mapped[str] = mapped_column(String(30), default="DRAFT")

    worker = relationship("Worker", back_populates="payroll_records")
