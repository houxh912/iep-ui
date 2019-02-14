# GDS-UI 国脉前端后台模板

## 注意

凡是以这个模板开发的项目, 都需要从这个项目的 `master` 分支分发出去, 改动文件规则请看规则

如果安装 `yarn` or `npm i` 缓慢, 请先更换为中国镜像.
```
npm set registry https://registry.npm.taobao.org
npm set disturl https://npm.taobao.org/dist
npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
```

## 上手开发

> 推荐使用 `git bash`

- 克隆项目代码
- 预装好 `node10+` 安装包
- 如果使用 `vscode` 开发,可使用我们推荐的 `vscode` 配置 你也可以选择自定义配置(命令: `cp vscode.config/ .vscode/ -rf`)
- 安装项目的依赖 `npm i` 或使用 `yarn` (需要预装，命令：`npm i -g yarn`)
- 拷贝 `cp .env .env.local`
- 修改开发环境代理 ip 配置 文件在 `.env.local`
- 确认安装依赖无错，即可运行 `yarn serve` 或 `npm run serve`


## 具体见 Wiki