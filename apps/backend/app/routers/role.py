from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.core.db import get_session
from app.models.role import Role
from app.crud import role as crud_role

role_router = APIRouter(prefix="/role")


@role_router.get("/", summary="获取角色列表", response_model=list[Role])
def get_list(session: Session = Depends(get_session)):
    return crud_role.get_all(session)


@role_router.post("/", summary="创建角色", response_model=Role)
def create_role(role: Role, session: Session = Depends(get_session)):
    return crud_role.create(session, role)


@role_router.put("/{role_id}", summary="更新角色", response_model=Role)
def update_role(role_id: int, role_in: Role, session: Session = Depends(get_session)):
    # 1. 先查
    db_role = crud_role.get_by_id(session, role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="角色不存在")

    return crud_role.update(session, db_role, role_in)


@role_router.delete("/{role_id}", summary="删除角色")
def delete_role(role_id: int, session: Session = Depends(get_session)):
    db_role = crud_role.get_by_id(session, role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="角色不存在")
    crud_role.delete(session, db_role)
    return {"message": "角色删除成功"}


@role_router.put("/{role_id}/default", summary="设置默认角色")
def set_default_role(role_id: int, session: Session = Depends(get_session)):
    return crud_role.set_current_role(session, role_id)


@role_router.get("/current", summary="获取当前激活的角色", response_model=Role | None)
def get_current_role(session: Session = Depends(get_session)):
    return crud_role.get_current_role(session)
