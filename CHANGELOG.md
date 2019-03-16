## [1.0.1](http://115.233.227.46:8066/root/iep-ui/compare/525c601...v1.0.1) (2019-03-15)


### Bug Fixes

* **src\components\IepCommon\Cascader.vue:** 岗位修复 ([de5f9a2](http://115.233.227.46:8066/root/iep-ui/commits/de5f9a2))
* **src\main.js:** fix build 问题 ([d0f2c14](http://115.233.227.46:8066/root/iep-ui/commits/d0f2c14))
* **src\page\index\index.vue:** fix 页面滚动问题 ([192affc](http://115.233.227.46:8066/root/iep-ui/commits/192affc))
* **src\page\index\sidebar\MainItem.vue:** 无菜单时修复 ([6ff5d69](http://115.233.227.46:8066/root/iep-ui/commits/6ff5d69))
* **src\views\admin\org\options.js:** 组织管理字段修改 ([c208416](http://115.233.227.46:8066/root/iep-ui/commits/c208416))
* **src\views\hrms\EmployeeProfile\Page\DepartureDialog.vue:** 离职时间修复 ([1fc1211](http://115.233.227.46:8066/root/iep-ui/commits/1fc1211))
* **src\views\hrms\EmployeeProfile\Page\List.vue:** fix userId to id ([abd53a1](http://115.233.227.46:8066/root/iep-ui/commits/abd53a1))
* **src\views\hrms\EmployeeProfile\Page\List.vue:** 修复人才库参会人变更问题 员工档案正式员工添加限制 ([976d628](http://115.233.227.46:8066/root/iep-ui/commits/976d628))
* **src\views\hrms\OrganizationalStructure\DepartmentManagement\options.js:** fix parentId = 0 才为父级 ([a6911f2](http://115.233.227.46:8066/root/iep-ui/commits/a6911f2))
* **src\views\hrms\Recruitment\Publish\Page\Edit.vue:** 修复代码问题 ([20254c9](http://115.233.227.46:8066/root/iep-ui/commits/20254c9))
* **src\views\hrms\Recruitment\TalentPool\ResumeBlacklist\Page\List.vue:** fix用户字段 ([3321ba7](http://115.233.227.46:8066/root/iep-ui/commits/3321ba7))
* **src\views\hrms\Recruitment\TalentPool\TalentPool\options.js:** 修复人才库字段更新 政治面貌等字段对接 ([7469308](http://115.233.227.46:8066/root/iep-ui/commits/7469308))
* **vue.config.js:** fix build Vue file 缺失问题 ([f370903](http://115.233.227.46:8066/root/iep-ui/commits/f370903))


### Features

* ****/dialog.vue/:** 在人力模块添加尽可能添加了弹出框 ([ec12991](http://115.233.227.46:8066/root/iep-ui/commits/ec12991))
* **/serve/controller/admin.js:** 添加项目(gpms),资源(mlms)菜单假数据 ([82a6629](http://115.233.227.46:8066/root/iep-ui/commits/82a6629))
* **ADD IEP-TABS components:** 详情见人力 ([581dadc](http://115.233.227.46:8066/root/iep-ui/commits/581dadc))
* **Add 标准的Git Commit 信息规范工具:** 使用详情可看https://zhuanlan.zhihu.com/p/51894196 ([525c601](http://115.233.227.46:8066/root/iep-ui/commits/525c601))
* **css:** 修复滚动样式问题与查看问题 ([f5a89c9](http://115.233.227.46:8066/root/iep-ui/commits/f5a89c9))
* **kkk:** lkkkk ([e86687f](http://115.233.227.46:8066/root/iep-ui/commits/e86687f))
* **src\api\hrms\employee_profile.js:** 完成员工管理的入职 转正 离职 ([e1f3786](http://115.233.227.46:8066/root/iep-ui/commits/e1f3786))
* **src\api\hrms\job_system.js:** 完成职称职务接口对接 ([c7b76cd](http://115.233.227.46:8066/root/iep-ui/commits/c7b76cd))
* **src\components\IepCommon\Avatar.vue:** 组织修复与头像组件上传 ([b282bc2](http://115.233.227.46:8066/root/iep-ui/commits/b282bc2))
* **src\components\IepCommon\Cascader.vue:** ADD Cascader Components ([a520838](http://115.233.227.46:8066/root/iep-ui/commits/a520838))
* **src\components\IepCommon\Cascader.vue:** 修复关联组件的外置属性问题 ([410a2cf](http://115.233.227.46:8066/root/iep-ui/commits/410a2cf))
* **src\components\IepCommon\ContactSelect.vue:** ADD 通讯录功能 ([a6659b0](http://115.233.227.46:8066/root/iep-ui/commits/a6659b0))
* **src\components\IepCommon\DatePicker.vue:** ADD DatePicker ([f94afb0](http://115.233.227.46:8066/root/iep-ui/commits/f94afb0))
* **src\components\IepCommon\Img.vue:** ADD ([6edb1e8](http://115.233.227.46:8066/root/iep-ui/commits/6edb1e8))
* **src\components\IepCommon\Img.vue:** ADD Iep-Img 组件 ([cef74c1](http://115.233.227.46:8066/root/iep-ui/commits/cef74c1))
* **src\components\IepCommon\Select.vue:** 添加单选关联按钮 ([543508b](http://115.233.227.46:8066/root/iep-ui/commits/543508b))
* **src\components\IepTable\index.vue:** 部门完成以及表格树完成 ([0cd94e6](http://115.233.227.46:8066/root/iep-ui/commits/0cd94e6))
* **src\page\index\top\TopGuide.vue:** 修复消息组件的互动问题, 添加使用指南图标 ([37c9042](http://115.233.227.46:8066/root/iep-ui/commits/37c9042))
* **src\util\util.js:** 全局添加全部字典接口 ([841046c](http://115.233.227.46:8066/root/iep-ui/commits/841046c))
* **src\views\goms\BasicConfiguration\ModuleConfiguration\index.vue:** 组织模块中模块配置静态化样式完成 ([8fc2ed3](http://115.233.227.46:8066/root/iep-ui/commits/8fc2ed3))
* **src\views\hrms\EmployeeProfile\options.js:** 完成员工调动新增接口 ([93dbcb1](http://115.233.227.46:8066/root/iep-ui/commits/93dbcb1))
* **src\views\hrms\EmployeeProfile\Page\List.vue:** 合并分支,解决冲突 ([586441d](http://115.233.227.46:8066/root/iep-ui/commits/586441d))
* **src\views\hrms\OrganizationalStructure\DepartmentManagement\AddDialogForm.vue:** 完成部门批量删除与删除 ([a7ca07e](http://115.233.227.46:8066/root/iep-ui/commits/a7ca07e))
* **src\views\hrms\OrganizationalStructure\JobTitleSystem\JobSystem\index.vue:** ADD DELETE and Batc ([84f6192](http://115.233.227.46:8066/root/iep-ui/commits/84f6192))
* **src\views\hrms\OrganizationalStructure\PostLibrary\PostLibrary\AddDialogForm.vue:** 岗位新增 ([29bbe9e](http://115.233.227.46:8066/root/iep-ui/commits/29bbe9e))
* **src\views\hrms\Recruitment\Publish:** (合并其对接发布招聘的分支提交)完成发布招聘接口对接 ([04af2c8](http://115.233.227.46:8066/root/iep-ui/commits/04af2c8))
* **src\views\hrms\Recruitment\Publish\options.js:** 更新 ([aa29b8b](http://115.233.227.46:8066/root/iep-ui/commits/aa29b8b))
* **src\views\hrms\Recruitment\Publish\Page\Detail.vue:** 发布招聘展示页 ([0dcac18](http://115.233.227.46:8066/root/iep-ui/commits/0dcac18))
* **src\views\hrms\Recruitment\TalentPool\TalentPool\options.js:** 完成人才库的城市与岗位字段 ([71f3df9](http://115.233.227.46:8066/root/iep-ui/commits/71f3df9))
* **src\views\hrms\Recruitment\TalentPool\TalentPool\Page\Edit.vue:** 完成人才库编辑新增与字段对接功能 ([ae39ff6](http://115.233.227.46:8066/root/iep-ui/commits/ae39ff6))
* **src\views\hrms\Recruitment\TalentPool\TalentPool\Page\ToBlacklistDialog.vue:** 完成放入简历库与黑名单接口 ([2d3ab59](http://115.233.227.46:8066/root/iep-ui/commits/2d3ab59))
* **vue.config.js:** 暂时开发中不考虑构建优化 ([02caf89](http://115.233.227.46:8066/root/iep-ui/commits/02caf89))
* **yarn.lock:** 添加了校验工具,从这个版本起使用工具规范提交 ([11ef9d5](http://115.233.227.46:8066/root/iep-ui/commits/11ef9d5))
* **样式修复:** 复原一些样式 ([a53141a](http://115.233.227.46:8066/root/iep-ui/commits/a53141a))




