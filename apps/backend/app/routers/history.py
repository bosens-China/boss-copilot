from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.core.db import get_session
from app.crud import history as crud_history
from app.models.history import History
from app.crud.role import get_current_role
from app.schemas.history import HistoryCreate

history_router = APIRouter(prefix="/history")


@history_router.get("/", summary="获取所有浏览记录", response_model=list[History])
def get_all(session: Session = Depends(get_session)):
    return crud_history.get_all(session)


@history_router.get(
    "/current", summary="获取当前角色的浏览记录", response_model=list[History]
)
def get_current_role_history(session: Session = Depends(get_session)):
    return crud_history.get_current_role_history(session)


@history_router.post("/", summary="添加浏览记录", response_model=History)
def add_history(history: HistoryCreate, session: Session = Depends(get_session)):
    current_role = get_current_role(session)
    if not current_role:
        raise HTTPException(status_code=400, detail="当前没有激活的角色")

    if current_role.id is None:
        raise HTTPException(status_code=400, detail="当前角色信息异常，缺少ID")

    db_history = History(
        role_id=current_role.id,
        encryptId=history.encryptId,
        jobName=history.jobName,
        url=history.url,
        companyName=history.companyName,
        salaryRange=history.salaryRange,
        cityName=history.cityName,
    )
    return crud_history.add_history(session, db_history)


@history_router.delete(
    "/current", summary="删除当前角色的浏览记录（清空当前角色所有记录）"
)
def delete_current_role_history(session: Session = Depends(get_session)):
    current_role = get_current_role(session)
    if not current_role:
        raise HTTPException(status_code=400, detail="当前没有激活的角色")

    if current_role.id is None:
        raise HTTPException(status_code=400, detail="当前角色信息异常，缺少ID")

    crud_history.delete_current_role_history(session)
    return {"success": True}


@history_router.delete("/{id}", summary="删除浏览记录")
def delete_history(id: int, session: Session = Depends(get_session)):
    return crud_history.delete_history(session, id)
