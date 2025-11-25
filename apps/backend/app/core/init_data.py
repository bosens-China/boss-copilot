from sqlmodel import Session, select

from app.models.blacklist import BlockedCompany
from app.core.constants import BLACKLIST
from app.models.role import Role
from app.models.position import Position


# 初始化黑名单公司
def init_blacklist(session: Session):
    statement = select(BlockedCompany)
    result = session.exec(statement).first()

    if result:
        print("黑名单已存在，跳过初始化")
        return

    for company in BLACKLIST:
        session.add(BlockedCompany(name=company))
    session.commit()

    print(f"初始化导入黑名单完成，共计导入 {len(BLACKLIST)} 条数据")


# 初始化默认角色
def init_default_role(session: Session):
    statement = select(Role)
    result = session.exec(statement).first()

    if result:
        print("默认角色已存在，跳过初始化")
        return

    # 先创建默认角色，提交后才能拿到角色 ID
    default_role = Role(name="默认角色", is_default=True)
    session.add(default_role)
    session.commit()
    session.refresh(default_role)

    # 使用新创建角色的 ID 初始化岗位信息（此时 default_role.id 一定已存在）
    if default_role.id is None:
        raise RuntimeError("默认角色ID不存在，初始化失败")

    session.add(
        Position(
            role_id=default_role.id,
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
    print("初始化默认角色完成")
