# 安装与使用

Boss Copilot 由 **后端服务** 和 **浏览器插件** 两部分组成，需同时运行才能正常工作。

## 第一步：启动后端服务

推荐使用 Docker Compose 一键启动。

### 1. 准备配置文件

在本地任意目录创建 `docker-compose.yml`：

```yaml
services:
  backend:
    image: boses/boss-copilot-backend:latest
    container_name: boss-copilot-backend
    restart: unless-stopped
    ports:
      - '8000:8000'
    environment:
      - DB_PATH=/app/data/database.db
    volumes:
      - ./data:/app/data
```

### 2. 启动容器

```bash
docker-compose up -d
```

### 3. 验证状态

访问 `http://127.0.0.1:8000/docs`，如果看到 API 文档页面，说明后端启动成功。

---

## 第二步：安装浏览器插件

### 1. 安装 Tampermonkey

如果您尚未安装，请先在浏览器中安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展。

### 2. 安装脚本

点击下方链接安装最新版脚本：

👉 [**安装 Boss Copilot (UserScript)**](https://github.com/bosens-China/boss-copilot/releases/latest/download/boss-copilot.user.js)

*(链接将跳转至 GitHub Releases，请选择最新版本的 `boss-copilot.user.js`)*

### 3. 验证连接

打开 Boss 直聘网站，如果插件加载成功，页面右下角或顶部应出现 Boss Copilot 的控制面板/图标。

如果显示“连接失败”，请检查后端服务是否已启动并在 `8000` 端口监听。

---

## 常见问题

### 数据库文件在哪里？

使用 Docker 启动时，数据库文件位于 `docker-compose.yml` 同级目录下的 `data/database.db`。

### 如何更新？

**更新后端**：
```bash
docker-compose pull
docker-compose up -d
```

**更新插件**：
Tampermonkey 通常会自动检测更新，或者您可以手动重新下载安装最新版脚本。
