from sqlmodel import Session, select
from app.models.position import Position
from app.crud.role import get_current_role
from app.schemas.position import PositionUpdate


# 返回当前角色的岗位设置
def get_current_position(session: Session) -> Position | None:
    current_role = get_current_role(session)
    if not current_role:
        return None
    if current_role.id is None:
        return None
    return session.exec(
        select(Position).where(Position.role_id == current_role.id)
    ).first()


# 更新当前角色的岗位设置
def update_current_position(
    session: Session, position_in: PositionUpdate
) -> Position | None:
    current_role = get_current_role(session)
    if not current_role or current_role.id is None:
        return None

    # 查询当前角色是否已有岗位设置
    db_position = session.exec(
        select(Position).where(Position.role_id == current_role.id)
    ).first()

    # 如果没有则创建一条新的
    if not db_position:
        db_position = Position(role_id=current_role.id)
        session.add(db_position)

    # 更新字段（只使用前端允许传递的字段）
    db_position.white = position_in.white
    db_position.black = position_in.black
    db_position.min_salary = position_in.min_salary
    db_position.max_salary = position_in.max_salary
    db_position.enabled = position_in.enabled
    db_position.city = position_in.city
    db_position.black_company_enabled = position_in.black_company_enabled
    db_position.history_highlight_enabled = position_in.history_highlight_enabled

    session.commit()
    session.refresh(db_position)
    return db_position
