from sqlmodel import SQLModel


class CurrentRoleBlockedCompanyCreate(SQLModel):
    """创建当前角色黑名单项时使用的入参模型（不暴露 role_id）"""

    name: str
    reason: str | None = None


class BlockedCompanyCreate(SQLModel):
    """创建通用黑名单公司时使用的入参模型"""

    name: str
