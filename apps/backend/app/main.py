from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.db import create_db_and_tables, engine
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from app.core.init_data import init_blacklist, init_default_role
from app.routers.blacklist import blacklist_router
from app.routers.role import role_router
from app.routers.history import history_router
from app.routers.position import position_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时自动创建表
    create_db_and_tables()
    with Session(engine) as session:
        init_blacklist(session)
        init_default_role(session)
    yield


app = FastAPI(lifespan=lifespan)
# 跨域处理
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(blacklist_router)
app.include_router(role_router)
app.include_router(history_router)
app.include_router(position_router)
