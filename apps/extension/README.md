# Boss Copilot Extension

Boss Copilot 的前端插件模块，基于 Vue 3 和 Tampermonkey 运行。

## 技术栈

- **Core**: Vue 3, TypeScript
- **Build**: Vite
- **UI Framework**: [Naive UI](https://www.naiveui.com/)
- **Styling**: UnoCSS
- **Network**: XHR Hijacking (拦截请求)

## 实现原理

### 非侵入式数据获取

Boss Copilot 采用 **XHR Hijacking (请求拦截)** 技术，不依赖 DOM 解析：

1.  代理浏览器原生的 `XMLHttpRequest` 对象。
2.  当 Boss 直聘前端发起岗位列表请求时，插件捕获响应。
3.  插件解析 JSON 数据，根据用户配置（薪资、黑名单）处理数据。
4.  处理后的数据再交还给原页面逻辑，或由插件渲染 UI。

### 数据同步

插件产生的配置变更、浏览历史等数据，通过 `fetch` 请求实时同步到后端服务。

## 开发指南

### 1. 依赖安装

```bash
# 在 apps/extension 目录下
pnpm install
```

### 2. 启动开发

```bash
pnpm dev
```

此模式下 Vite 会启动一个本地服务。

### 3. 配置 Tampermonkey

1.  开发模式下，Vite 控制台会输出一个链接。
2.  在 Tampermonkey 中创建一个新脚本，通过 `@require` 引入该链接，即可实现热更新调试。

### 4. 类型同步

前端项目强依赖 `packages/codegen` 中生成的后端类型。如果后端接口发生变更，请在根目录运行 `pnpm gen-types`。

### 5. 构建

```bash
pnpm build
```

构建产物为 `dist/boss-copilot.user.js`。
