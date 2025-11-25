from sqlmodel import SQLModel, Field, UniqueConstraint


# 通用的黑名单公司
class BlockedCompany(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)


# 当前角色的黑名单公司
class CurrentRoleBlockedCompany(SQLModel, table=True):
    __table_args__ = (UniqueConstraint("role_id", "name"),)

    id: int | None = Field(default=None, primary_key=True)
    role_id: int = Field(index=True, description="角色id")
    name: str = Field(index=True)
    reason: str | None = Field(default=None, description="理由")
