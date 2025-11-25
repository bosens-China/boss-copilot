from typing import Any, cast
from fastapi import HTTPException
from sqlmodel import Session, select, delete as sql_delete
from app.models.role import Role
from app.models.position import Position
from app.models.history import History
from app.models.blacklist import CurrentRoleBlockedCompany


# 获取所有角色
def get_all(session: Session) -> list[Role]:
    return list(session.exec(select(Role)))


# 获取指定id的角色
def get_by_id(session: Session, role_id: int) -> Role | None:
    return session.get(Role, role_id)


# 创建角色
def create(session: Session, role: Role) -> Role:
    # 如果新建角色设置为默认角色，则需要取消当前默认角色
    if role.is_default:
        current_role = get_current_role(session)
        if current_role:
            current_role.is_default = False

    # 1. 先保存角色以获取 ID
    session.add(role)
    session.commit()
    session.refresh(role)

    # 2. 使用生成的 ID 创建关联的岗位设置
    if role.id is None:
        # 理论上不会发生，除非数据库异常
        raise HTTPException(status_code=500, detail="角色创建失败，无法获取ID")

    session.add(
        Position(
            role_id=role.id,
            enabled=True,
            white="",
            black="",
            min_salary=None,
            max_salary=None,
            city="",
            black_company_enabled=True,
            history_highlight_enabled=True,
        )
    )
    session.commit()
    return role


# 更新角色
def update(session: Session, db_role: Role, role_in: Role) -> Role:
    current_role = get_current_role(session)
    db_role.name = role_in.name

    # 如果更新当前角色的 is_default，需要进行检查：
    # - 如果为 True：需要把之前的默认角色设置为 False
    # - 如果为 False：如果当前默认角色就是这个角色，则不允许取消默认
    if role_in.is_default:
        if current_role and current_role.id != db_role.id:
            current_role.is_default = False
        db_role.is_default = True
    else:
        if current_role and current_role.id == db_role.id:
            # 不允许取消当前默认角色
            raise HTTPException(status_code=400, detail="默认角色不允许取消默认")
        # 非当前默认角色，允许更新为非默认
        db_role.is_default = False

    session.commit()
    session.refresh(db_role)
    return db_role


# 删除角色
def delete(session: Session, db_role: Role):
    # 先判断是否为最后一个，如果是不允许删除
    roles = get_all(session)
    if len(roles) <= 1:
        raise HTTPException(status_code=400, detail="至少保留一个角色")
    # 如果删除的是默认角色，那么需要设置一个默认角色，设置第一个为默认
    if db_role.is_default:
        # 从候选中排除即将删除的这个角色
        candidates = [role for role in roles if role.id != db_role.id]
        if not candidates:
            raise HTTPException(status_code=400, detail="至少保留一个角色")
        candidates[0].is_default = True

    # 删除关联数据
    session.exec(sql_delete(Position).where(cast(Any, Position.role_id == db_role.id)))
    session.exec(sql_delete(History).where(cast(Any, History.role_id == db_role.id)))
    session.exec(
        sql_delete(CurrentRoleBlockedCompany).where(
            cast(Any, CurrentRoleBlockedCompany.role_id == db_role.id)
        )
    )

    session.delete(db_role)
    session.commit()


# 获取当前激活的角色
def get_current_role(session: Session) -> Role | None:
    return session.exec(select(Role).where(Role.is_default)).first()


# 设置激活角色，同时更新其他角色的is_default为False
def set_current_role(session: Session, role_id: int) -> Role:
    roles = get_all(session=session)

    target_role: Role | None = None
    for role in roles:
        if role.id == role_id:
            target_role = role
            break

    if not target_role:
        raise HTTPException(status_code=404, detail="角色不存在")

    for role in roles:
        role.is_default = role.id == role_id

    session.commit()
    session.refresh(target_role)
    return target_role
