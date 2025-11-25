from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.core.db import get_session
from app.crud import blacklist as crud_blacklist
from app.models.blacklist import CurrentRoleBlockedCompany, BlockedCompany
from app.crud.role import get_current_role
from app.schemas.blacklist import (
    CurrentRoleBlockedCompanyCreate,
    BlockedCompanyCreate,
)

blacklist_router = APIRouter(prefix="/blacklist")


@blacklist_router.get(
    "/common", summary="获取通用黑名单列表", response_model=list[BlockedCompany]
)
def get_common_blocked_companies(session: Session = Depends(get_session)):
    return crud_blacklist.get_common_blocked_companies(session)


@blacklist_router.get(
    "/current",
    summary="获取当前角色的黑名单公司",
    response_model=list[CurrentRoleBlockedCompany],
)
def get_current_role_blocked_companies(session: Session = Depends(get_session)):
    # print(1)
    return crud_blacklist.get_current_role_blocked_companies(session)


@blacklist_router.post("/current", summary="批量添加当前角色的黑名单公司")
def add_current_role_blocked_companies(
    blocked_companies: list[CurrentRoleBlockedCompanyCreate],
    session: Session = Depends(get_session),
):
    current_role = get_current_role(session)
    if not current_role:
        raise HTTPException(status_code=400, detail="当前没有激活的角色")

    if current_role.id is None:
        raise HTTPException(status_code=400, detail="当前角色信息异常，缺少ID")

    to_create = [
        CurrentRoleBlockedCompany(
            role_id=current_role.id,
            name=item.name,
            reason=item.reason,
        )
        for item in blocked_companies
    ]

    return crud_blacklist.add_current_role_blocked_companies(session, to_create)


@blacklist_router.delete("/current/{id}", summary="删除当前角色的黑名单公司")
def delete_current_role_blocked_company(
    id: int, session: Session = Depends(get_session)
):
    return crud_blacklist.delete_current_role_blocked_company(session, id)


@blacklist_router.post("/common", summary="批量添加通用的黑名单公司")
def add_blocked_companies(
    blocked_companies: list[BlockedCompanyCreate],
    session: Session = Depends(get_session),
):
    to_create = [BlockedCompany(name=item.name) for item in blocked_companies]
    return crud_blacklist.add_common_blocked_companies(session, to_create)


@blacklist_router.delete("/common/{id}", summary="删除通用的黑名单公司")
def delete_blocked_company(id: int, session: Session = Depends(get_session)):
    return crud_blacklist.delete_common_blocked_company(session, id)


@blacklist_router.post("/common/reset", summary="重置通用黑名单列表")
def reset_common_blocked_companies(session: Session = Depends(get_session)):
    return crud_blacklist.reset_common_blocked_companies(session)
