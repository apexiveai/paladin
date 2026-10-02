from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Site(Base):
    __tablename__ = "sites"

    id: Mapped[int] = mapped_column(primary_key=True)
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"), index=True)
    site_code: Mapped[str] = mapped_column(String(50), index=True)
    name: Mapped[str] = mapped_column(String(200))
    address: Mapped[str | None] = mapped_column(String(500), nullable=True)
    required_guards: Mapped[int] = mapped_column(default=1)
    status: Mapped[bool] = mapped_column(Boolean, default=True)

    company = relationship("Company", back_populates="sites")
    assignments = relationship("Assignment", back_populates="site")
    attendance_records = relationship("AttendanceRecord", back_populates="site")
