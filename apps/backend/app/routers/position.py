from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.core.db import get_session
from app.crud import position as crud_position
from app.models.position import Position
from app.schemas.position import PositionUpdate


position_router = APIRouter(prefix="/position")


@position_router.get(
    "/", summary="获取当前角色的岗位设置", response_model=Position | None
)
def get_current_position(session: Session = Depends(get_session)):
    return crud_position.get_current_position(session)


@position_router.put(
    "/", summary="更新当前角色的岗位设置", response_model=Position | None
)
def update_current_position(
    position: PositionUpdate, session: Session = Depends(get_session)
):
    return crud_position.update_current_position(session, position)
