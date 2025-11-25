from typing import Any, cast

from sqlmodel import Session, select, delete
from app.models.history import History
from app.crud.role import get_current_role


# 返回所有浏览记录
def get_all(session: Session) -> list[History]:
    return list(session.exec(select(History)))


# 返回当前角色的浏览记录
def get_current_role_history(session: Session) -> list[History]:
    current_role = get_current_role(session)
    if not current_role:
        return []
    return list(session.exec(select(History).where(History.role_id == current_role.id)))


# 添加浏览记录
def add_history(session: Session, history: History):
    session.add(history)
    session.commit()
    session.refresh(history)
    return history


# 删除当前角色浏览记录，清空
def delete_current_role_history(session: Session):
    current_role = get_current_role(session)
    if not current_role:
        return
    condition_role = cast(Any, History.role_id == current_role.id)
    stmt = delete(History).where(condition_role)
    session.exec(stmt)
    session.commit()


# 删除某条浏览记录
def delete_history(session: Session, id: int):
    history = session.get(History, id)
    if not history:
        return False
    session.delete(history)
    session.commit()
    return True
