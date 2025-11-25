from sqlmodel import SQLModel, Field
import time


# 过滤结果的基本格式
class HistoryItem(SQLModel):
    encryptId: str = Field(index=True, description="岗位的唯一id")
    jobName: str = Field(description="岗位名称")
    url: str = Field(description="跳转url")
    companyName: str = Field(description="公司名称")
    salaryRange: str = Field(description="薪水范围")
    cityName: str = Field(description="城市名称")


class History(HistoryItem, table=True):
    id: int | None = Field(default=None, primary_key=True)
    time: int = Field(description="时间戳", default_factory=lambda: int(time.time()))
    role_id: int = Field(index=True, description="角色id")
