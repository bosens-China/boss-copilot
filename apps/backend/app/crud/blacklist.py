from sqlmodel import Session, select
from app.models.blacklist import BlockedCompany
from app.crud.role import get_current_role
from app.models.blacklist import CurrentRoleBlockedCompany
from sqlmodel import delete
from app.core.constants import BLACKLIST


# 获取通用黑名单列表
def get_common_blocked_companies(session: Session) -> list[BlockedCompany]:
    return list(session.exec(select(BlockedCompany)))


# 获取当前角色的黑名单公司
def get_current_role_blocked_companies(
    session: Session,
) -> list[CurrentRoleBlockedCompany]:
    current_role = get_current_role(session)
    if not current_role:
        return []
    return list(
        session.exec(
            select(CurrentRoleBlockedCompany).where(
                CurrentRoleBlockedCompany.role_id == current_role.id
            )
        )
    )


# 添加当前角色的黑名单公司
def add_current_role_blocked_companies(
    session: Session, blocked_companies: list[CurrentRoleBlockedCompany]
) -> list[CurrentRoleBlockedCompany]:
    session.add_all(blocked_companies)
    session.commit()
    for company in blocked_companies:
        session.refresh(company)
    return blocked_companies


# 添加通用的黑名单公司
def add_common_blocked_companies(
    session: Session, blocked_companies: list[BlockedCompany]
) -> list[BlockedCompany]:
    session.add_all(blocked_companies)
    session.commit()
    for company in blocked_companies:
        session.refresh(company)
    return blocked_companies


# 删除当前角色黑名单公司
def delete_current_role_blocked_company(session: Session, id: int):
    blocked_company = session.get(CurrentRoleBlockedCompany, id)
    if not blocked_company:
        return
    session.delete(blocked_company)
    session.commit()
    return blocked_company


# 删除通用黑名单公司
def delete_common_blocked_company(session: Session, id: int):
    blocked_company = session.get(BlockedCompany, id)
    if not blocked_company:
        return
    session.delete(blocked_company)
    session.commit()
    return blocked_company


# 重置通用黑名单公司列表
def reset_common_blocked_companies(session: Session):
    # 清空现有黑名单
    session.exec(delete(BlockedCompany))

    # 重新导入默认黑名单
    for company in BLACKLIST:
        session.add(BlockedCompany(name=company))

    session.commit()
    return True
