from sqlmodel import SQLModel, create_engine, Session
import os

# 数据文件会生成在 backend 目录下，优先读取环境变量，方便 Docker 挂载
sqlite_file_name = os.getenv("DB_PATH", "database.db")
sqlite_url = f"sqlite:///{sqlite_file_name}"

# check_same_thread=False 是 SQLite 在 FastAPI 这种多线程环境必须的
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
