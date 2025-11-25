# 项目介绍

Boss Copilot 是一个基于 Tampermonkey 的浏览器扩展，专为 Boss 直聘用户设计，提供高级的岗位筛选、管理及浏览记录追踪功能。

本项目采用前后端分离的 Monorepo 架构，由 FastAPI 后端服务和 Vue 3 前端插件组成，旨在解决传统油猴脚本无法持久化存储大量数据及复杂状态管理的问题。

## 核心特性

- **多角色管理**：支持创建和切换多个求职角色（如“前端开发”、“后端架构”），每个角色拥有独立的配置与黑名单。
- **高级过滤**：
  - **薪资范围**：基于预设范围自动隐藏不符合薪资要求的岗位。
  - **黑名单机制**：支持公司维度的屏蔽，内置常见外包名单并支持自定义。
  - **城市筛选**：精确匹配工作地点。
- **浏览历史追踪**：自动记录已浏览岗位，并在列表中高亮显示，避免重复查看。
- **快捷操作**：支持一键加载所有岗位、一键清空历史记录等效率工具。

## 快速开始

请参考 [安装与使用](./installation.md) 指南。

## 项目结构

本项目使用 pnpm workspace 管理：

- `apps/backend`: 后端服务 (Python/FastAPI)，负责数据持久化 (SQLite)。
- `apps/extension`: 前端插件 (Vue 3/Vite)，运行于 Tampermonkey 环境。
- `packages/codegen`: 类型生成工具，用于根据后端 OpenAPI 规范生成前端 TypeScript 类型定义。

## 贡献

欢迎提交 Pull Request 或 Issue。

[GitHub 项目地址](https://github.com/bosens-China/boss-copilot)
