# Boss Copilot Backend

Boss Copilot 的后端服务模块，基于 FastAPI 和 SQLModel 构建。

## 技术栈

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) - 高性能 Python Web 框架。
- **Database**: SQLite - 轻量级文件数据库，易于部署和备份。
- **ORM**: [SQLModel](https://sqlmodel.tiangolo.com/) - 结合了 SQLAlchemy 和 Pydantic 的优势。
- **Package Manager**: [uv](https://github.com/astral-sh/uv) - 极速 Python 包管理工具。

## 功能职责

- **数据存储**: 管理 Role (角色), Position (岗位配置), History (浏览记录), Blacklist (黑名单) 等数据模型。
- **API 服务**: 提供 RESTful API 供前端插件调用。
- **OpenAPI**: 自动生成 OpenAPI 规范文档，用于前端类型同步。

## 开发指南

### 1. 环境准备

确保已安装 Python 3.12+ 和 `uv`。

### 2. 启动服务

```bash
# 在 apps/backend 目录下
uv run fastapi dev app/main.py
```

服务默认运行在 `http://127.0.0.1:8000`。

### 3. 数据管理

服务启动后会在当前目录生成 `database.db` 文件。如需重置数据，直接删除该文件并重启服务即可。

### 4. 导出 OpenAPI 规范

该命令用于支持前端类型生成流程（通常由根目录脚本调用）：

```bash
uv run python -m scripts.export_openapi
```

## Docker 部署

详情请参考 [Docker 部署指南](../../docs/guide/deploy.md)。

Dockerfile 位于本目录下，手动构建命令：

```bash
docker build -t boss-copilot-backend -f Dockerfile .
```
