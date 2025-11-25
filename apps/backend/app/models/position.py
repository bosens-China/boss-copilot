from sqlmodel import SQLModel, Field


class PositionBase(SQLModel):
    """岗位设置的基础字段（不包含 id、role_id）"""

    white: str | None = Field(default=None, description="白名单")
    black: str | None = Field(default=None, description="黑名单")
    min_salary: int | None = Field(default=None, description="最低薪水")
    max_salary: int | None = Field(default=None, description="最高薪水")
    enabled: bool = Field(default=True, description="是否启用")
    city: str | None = Field(default=None, description="城市")
    black_company_enabled: bool = Field(
        default=True, description="黑名单公司过滤是否启用"
    )
    history_highlight_enabled: bool = Field(
        default=True, description="浏览历史高亮是否启用"
    )


class Position(PositionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    role_id: int = Field(index=True, description="角色id")
