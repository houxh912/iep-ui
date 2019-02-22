# IEP-UI 国脉内网

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

## 内网前端任务分配(组件以及负责人变更需这里修改)

| 组件             | 组件路径          | 组件所属父组件 | 负责人      | 负责人 | 负责人 | 负责人 |
|------------------|-------------------|----------------|-------------|--------|--------|--------|
| Top/NavBar       | 顶部导航          | Top            | 重庆-谭建林 |        |        |        |
| Top/             | 顶部元素          | ElHeader       | 张超        |        |        |        |
| SideBar/MainItem | 主菜单            | ELAside        | 张超        |        |        |        |
| Wel/WelAside     | 工作台/右侧操作栏 | Wel            | 重庆-谭建林 |        |        |        |
| Wel/WelConTent   | 工作台/中间赋能台 | Wel            | 重庆-谭建林 |        |        |        |
| Hrms             | 人力              | Views          | 张超        |        |        |        |
| Crms             | 客户              | Views          | 胡争伟      |        |        |        |
| Core             | 核心              | Views          | 张超        |        |        |        |
| App              | 游客展示页        | Views          | Undefined   |        |        |        |

## 产品设计图获取

https://www.yuque.com/zsr/iep
私有画板图

## Git 管理必读

https://juejin.im/post/5aa7e8a6f265da239f070d82

## 菜单规范

| 节点ID | 菜单名称 | 类型 | 前端组件               | 前端地址 | 图标 | 权限标识     |
|--------|----------|------|------------------------|----------|------|--------------|
| 10000   | 核心管理(模块) | 菜单 | Layout(模块)                 | /core(注意有斜杠)    |      |              |
| 11000   | 权限管理 | 菜单 | Layout(顶级菜单)              | upms    |      |              |
| 11100   | 用户管理 | 菜单 | views/admin/user/index(页面菜单) | user     |      |              |
| 11101   | 用户新增 | 按钮 |                        |          |      | sys_user_add |

模块以1000为单位
模块下页面以100为单位,子页面以10为单位,权限按钮以1为单位

以下只列出模块节点ID

| 节点ID | 菜单名称 | 类型 | 前端组件 | 前端地址 | 图标 | 权限标识 |
|--------|----------|------|----------|----------|------|----------|
| 11000   | 权限管理 | 菜单 | Layout   | /upms    |      |          |
| 12000   | 系统管理 | 菜单 | Layout   | /admin   |      |          |
| 13000   | 系统监控 | 按钮 | Layout   | /daemon  |      |          |
| 14000   | 协同管理 | 按钮 | Layout   | /activti |      |          |
| 5000   | 人力(模块)     | 按钮 | Layout   | /hrms    |      |          |
| 6000   | 客户(模块)     | 按钮 | Layout   | /crms    |      |          |
| 10000   | 核心(模块)     | 按钮 | Layout   | /crms    |      |          |

## 具体见 Wiki