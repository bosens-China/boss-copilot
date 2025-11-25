FROM python:3.12-slim-bookworm

# 安装 uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 设置工作目录
WORKDIR /app

# 复制依赖配置
COPY pyproject.toml uv.lock ./

# 安装依赖 (仅安装依赖，不安装项目本身)
RUN uv sync --frozen --no-install-project

# 复制源代码
COPY . .

# 创建数据目录
RUN mkdir -p /app/data

# 设置环境变量
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH=/app

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["uv", "run", "fastapi", "run", "app/main.py", "--host", "0.0.0.0", "--port", "8000"]

