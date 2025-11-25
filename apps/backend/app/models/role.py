from sqlmodel import SQLModel, Field


class Role(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    is_default: bool = Field(default=False)
