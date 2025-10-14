# Changelog

## [2.0.0](https://github.com/bosens-China/boss-copilot/compare/new-vv1.2.4...new-vv2.0.0) (2025-10-14)


### ⚠ BREAKING CHANGES

* 本次更新为完全重写，与所有旧版本均不兼容，旧的API和用法已废弃。

### Features

* 修复CI没有发布版本问题 ([bbb3fe5](https://github.com/bosens-China/boss-copilot/commit/bbb3fe5030122295c3afbc55343e81335be150ff))
* 完成主体功能开发 ([30330fd](https://github.com/bosens-China/boss-copilot/commit/30330fd9cc34e9eb275e6e03f6d50a5c4b0c6bc8))
* 完成初版功能编写 ([f56af48](https://github.com/bosens-China/boss-copilot/commit/f56af4880681ec52cc312666cd53641cf2fc3ef6))
* 完成设置界面 ([cfa199c](https://github.com/bosens-China/boss-copilot/commit/cfa199c7cf8574c602b46e09bba7071496d7de42))
* 完成页面解析工作 ([9408381](https://github.com/bosens-China/boss-copilot/commit/94083814b6d671abfa810357beae78959751d220))
* 完成高亮方法编写 ([b6c61b6](https://github.com/bosens-China/boss-copilot/commit/b6c61b6560fae4686c4e45a5316f5ce494da77da))
* 对提示展示信息进行优化，对名单进行拓展，对CI触发进行优化 ([15099b3](https://github.com/bosens-China/boss-copilot/commit/15099b30bd51c6b0b40572cd4ac2a599e64230f5))
* 对构建完成文件添加油猴注释 ([737878d](https://github.com/bosens-China/boss-copilot/commit/737878d59e7e80f529e7cf8cef671da56cca8a02))
* 对脚本加载json改为当前分支形式获取 ([7683047](https://github.com/bosens-China/boss-copilot/commit/7683047f1a4720ef277b86a98d4ae811a185d279))
* 新增关键词名单 ([3d40c3c](https://github.com/bosens-China/boss-copilot/commit/3d40c3c8859f0f7165baee028c79b410941f1ef5))
* 新版文档补充，对操作成功提示 ([769217b](https://github.com/bosens-China/boss-copilot/commit/769217b00bc3e5ffb1e1f93751d1178cfdbde568))
* 更新描述文件以及Ci ([2d9ae43](https://github.com/bosens-China/boss-copilot/commit/2d9ae43e2b2e9cfbd9acf8505fb8ef2e84782397))
* 添加工作流 ([4b3aef7](https://github.com/bosens-China/boss-copilot/commit/4b3aef7099fa3eee6657888c3d05fc8f98b57e25))
* 添加远程拉取功能，对组件命名调整 ([8f69001](https://github.com/bosens-China/boss-copilot/commit/8f690011a609866b7a3e17314125e33a006d9023))
* 添加预览页面，对界面管理添加关键词功能 ([6d5dabf](https://github.com/bosens-China/boss-copilot/commit/6d5dabf6e88c50c37728565b71e0d9c1c37ec903))


### Bug Fixes

* **ci:** use correct target-branch parameter for release-please ([55635e1](https://github.com/bosens-China/boss-copilot/commit/55635e132914fcd018a881a9971affe84e2d89d9))
* 修复axios无法使用问题 ([428c159](https://github.com/bosens-China/boss-copilot/commit/428c159cd724f1fc74b451487340767fb7f2be2f))
* 修复ci删除分支命令错误 ([32c6685](https://github.com/bosens-China/boss-copilot/commit/32c66856e4f555e26f788d48d2d542c7fdf69a04))
* 修复es下axios模块不存在导致的错误 ([4e40cba](https://github.com/bosens-China/boss-copilot/commit/4e40cbac1127cc11cc79f60fdb2b600e485369d3))
* 修复git文件大小写不敏感,导致的ci错误 ([c89d61a](https://github.com/bosens-China/boss-copilot/commit/c89d61a31f66ab8f5f5bf96ed99e81746d9c7e8a))
* 修复yml拼写错误 ([50fb37f](https://github.com/bosens-China/boss-copilot/commit/50fb37f4359d594fb1708845a24b0ebc66cb207b))
* 修复正则未匹配问题 ([69ba213](https://github.com/bosens-China/boss-copilot/commit/69ba213b7c86976999e04c0993e8562182a9b73b))
* 添加tag ([743427d](https://github.com/bosens-China/boss-copilot/commit/743427dacfe083ae38251c0352eb08209d868cc4))


### Performance Improvements

* 优化http请求数量 ([1d99189](https://github.com/bosens-China/boss-copilot/commit/1d99189bcdfbeba525f8211db3dea704d326ac29))


### Code Refactoring

* 整体代码全部重构，升级为copilot ([69013be](https://github.com/bosens-China/boss-copilot/commit/69013bebb3ab39dff625366c86bcfdc46ba9efa5))
