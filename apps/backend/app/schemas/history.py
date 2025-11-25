from app.models.history import HistoryItem


class HistoryCreate(HistoryItem):
    """创建浏览记录时使用的入参模型（不暴露 id、role_id、time）"""

    pass
