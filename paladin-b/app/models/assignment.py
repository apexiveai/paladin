from datetime import date

from sqlalchemy import Date, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Assignment(Base):
    __tablename__ = "assignments"

    id: Mapped[int] = mapped_column(primary_key=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"), index=True)
    site_id: Mapped[int] = mapped_column(ForeignKey("sites.id"), index=True)
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    shift: Mapped[str] = mapped_column(String(50), default="DAY")
    status: Mapped[str] = mapped_column(String(30), default="ACTIVE")

    worker = relationship("Worker", back_populates="assignments")
    company = relationship("Company", back_populates="assignments")
    site = relationship("Site", back_populates="assignments")
